import Router from '@koa/router';
import { authenticate } from '../../middlewares/authentication';
import { onGoingApplications } from '../../middlewares/scheduleCheck';
import { JudgeApplication } from '../../models/applications/JudgeApplication';

const judgeApplicationsRouter = new Router();

judgeApplicationsRouter.prefix('/applications/judges');
judgeApplicationsRouter.use(authenticate);
judgeApplicationsRouter.use(async (ctx, next) => {
    ctx.state.applicationType = 'judge';
    return await next();
});
judgeApplicationsRouter.use(onGoingApplications);

judgeApplicationsRouter.get('/edit', async (ctx) => {
    const app = await JudgeApplication.findUserApplication(ctx.state.user);

    return ctx.render('applications/judges', {
        app,
        user: ctx.state.user,
    });
});

judgeApplicationsRouter.post('/save', async (ctx) => {
    let app = await JudgeApplication.findUserApplication(ctx.state.user);

    if (!app) {
        app = new JudgeApplication();
    }

    app.reason = ctx.request.body.reason.trim();
    app.user = ctx.state.user;
    await app.save();

    if (app) {
        return ctx.redirect('/');
    }

    return ctx.render('error');
});

export default judgeApplicationsRouter;