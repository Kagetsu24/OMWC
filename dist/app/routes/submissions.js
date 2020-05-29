"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const koa_body_1 = __importDefault(require("koa-body"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../helpers");
const authentication_1 = require("../middlewares/authentication");
const Round_1 = require("../models/rounds/Round");
const Submission_1 = require("../models/rounds/Submission");
const Match_1 = require("../models/rounds/Match");
const downloadSubmission_1 = require("../middlewares/downloadSubmission");
const Log_1 = require("../models/Log");
const baseDir = path_1.default.join(__dirname, '../../osz/originals/');
const submissionsRouter = new router_1.default();
submissionsRouter.prefix('/api/submissions');
submissionsRouter.use(authentication_1.authenticate);
submissionsRouter.use(authentication_1.isCaptain);
submissionsRouter.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (ctx.state.user.country.wasConfirmed) {
        yield next();
    }
    else {
        return ctx.body = {
            error: 'Your team is not competing',
        };
    }
}));
submissionsRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const submissions = yield Submission_1.Submission.find({
        where: { country: ctx.state.user.country },
        relations: ['match', 'match.round'],
    });
    const currentRound = yield Round_1.Round.findCurrentSubmissionRound();
    let currentMatch;
    if (currentRound) {
        currentMatch = yield Match_1.Match.findRelatedCountryMatch(currentRound, ctx.state.user.country.id);
    }
    ctx.body = {
        currentRound,
        currentMatch,
        submissions,
    };
}));
submissionsRouter.post('/save', koa_body_1.default({
    multipart: true,
    formidable: {
        multiples: false,
    },
}), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const currentRound = yield Round_1.Round.findCurrentSubmissionRound();
    if (!currentRound) {
        return ctx.body = {
            error: 'No round in progress',
        };
    }
    const oszFile = (_a = ctx.request.files) === null || _a === void 0 ? void 0 : _a.oszFile;
    if (!oszFile || !oszFile.name.endsWith('.osz')) {
        return ctx.body = {
            error: 'Select an .osz file',
        };
    }
    const captainCountry = ctx.state.user.country;
    const match = yield Match_1.Match.findRelatedCountryMatch(currentRound, captainCountry.id);
    if (!match) {
        return ctx.body = {
            error: `Your team isn't competeting`,
        };
    }
    const finalDir = path_1.default.join(baseDir, ctx.state.user.country.code);
    const fileName = `${ctx.state.user.country.name} - ${currentRound.title}.osz`;
    const finalPath = path_1.default.join(finalDir, fileName);
    const originalPath = path_1.default.join(ctx.state.user.country.code, fileName);
    if (oszFile) {
        yield helpers_1.saveFile(oszFile.path, finalDir, finalPath);
    }
    yield helpers_1.checkFileExistence(finalPath);
    let submission = yield Submission_1.Submission.findOne({
        country: captainCountry,
        match,
    });
    if (!submission) {
        submission = new Submission_1.Submission();
        submission.match = match;
        submission.country = ctx.state.user.country;
    }
    submission.originalPath = originalPath;
    yield submission.save();
    ctx.body = {
        success: 'ok',
    };
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} uploaded a submission for ${currentRound.title} under ${originalPath}`, Log_1.LOG_TYPE.User, submission.id);
}));
submissionsRouter.get('/:id/download', downloadSubmission_1.findSubmission, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = ctx.state.submission;
    if (submission.countryId !== ctx.state.user.country.id) {
        return ctx.body = {
            error: 'Unauthorized',
        };
    }
    ctx.state.baseDir = baseDir;
    ctx.state.downloadPath = submission.originalPath;
    return yield next();
}), downloadSubmission_1.download);
exports.default = submissionsRouter;
