import Router from '@koa/router';
import koaBody from 'koa-body';
import fs from 'fs';
import path from 'path';
import { convertToIntOrThrow, checkFileExistence } from '../helpers';
import { authenticate, isCaptain } from '../middlewares/authentication';
import { Round } from '../models/rounds/Round';
import { Submission } from '../models/rounds/Submission';
import { Match } from '../models/rounds/Match';

const baseDir = path.join(__dirname, '../../osz/');
const submissionsRouter = new Router();

submissionsRouter.prefix('/api/submissions');
submissionsRouter.use(authenticate);
submissionsRouter.use(isCaptain);
submissionsRouter.use(async (ctx, next) => {
    if (ctx.state.user.country.wasConfirmed) {
        await next();
    } else {
        return ctx.body = {
            error: 'Your team is not competing',
        };
    }
});

submissionsRouter.get('/', async (ctx) => {
    const submissions = await Submission.find({
        where: { country: ctx.state.user.country },
        relations: ['match', 'match.round'],
    });
    const currentRound = await Round.findCurrentSubmissionRound();
    let currentMatch;

    if (currentRound) {
        currentMatch = await Match.findRelatedCountryMatch(currentRound, ctx.state.user.country.id);
    }

    ctx.body = {
        currentRound,
        currentMatch,
        submissions,
    };
});

submissionsRouter.post('/save', koaBody({
    multipart: true,
    formidable: {
        multiples: false,
    },
}), async (ctx) => {
    const currentRound = await Round.findCurrentSubmissionRound();

    if (!currentRound) {
        return ctx.body = {
            error: 'No round in progress',
        };
    }

    const oszFile = ctx.request.files?.oszFile;

    if (!oszFile || !oszFile.name.endsWith('.osz')) {
        return ctx.body = {
            error: 'Select an .osz file',
        };
    }

    const captainCountry = ctx.state.user.country;
    const match = await Match.findRelatedCountryMatch(currentRound, captainCountry.id);

    if (!match) {
        return ctx.body = {
            error: `Your team isn't competeting`,
        };
    }

    const finalDir = path.join(baseDir, ctx.state.user.country.code);
    const fileName = `${ctx.state.user.country.name} - ${currentRound.title}.osz`;
    const finalPath = path.join(finalDir, fileName);
    const originalPath = path.join(ctx.state.user.country.code, fileName);

    if (oszFile) {
        const reader = fs.createReadStream(oszFile.path);
        await fs.promises.mkdir(finalDir, { recursive: true });

        const stream = fs.createWriteStream(finalPath);
        reader.pipe(stream);
    }

    await checkFileExistence(finalPath);

    let submission = await Submission.findOne({
        country: captainCountry,
        match,
    });

    if (!submission) {
        submission = new Submission();
        submission.match = match;
        submission.country = ctx.state.user.country;
    }

    submission.originalPath = originalPath;
    await submission.save();

    ctx.body = {
        success: 'ok',
    };
});

submissionsRouter.get('/:id/download', async (ctx) => {
    const id = convertToIntOrThrow(ctx.params.id);
    const submission = await Submission.findOneOrFail({ id });

    if (submission.countryId !== ctx.state.user.country.id) {
        return ctx.body = {
            error: 'Unauthorized',
        };
    }

    await checkFileExistence(path.join(baseDir, submission.originalPath));

    const split = submission.originalPath.split('/');
    ctx.attachment(split[split.length - 1]);
    ctx.type = 'application/octet-stream';
    ctx.body = fs.createReadStream(path.join(baseDir, submission.originalPath));
});

export default submissionsRouter;
