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
const authentication_1 = require("../../middlewares/authentication");
const scheduleCheck_1 = require("../../middlewares/scheduleCheck");
const CaptainApplication_1 = require("../../models/applications/CaptainApplication");
const Log_1 = require("../../models/Log");
const captainApplicationsRouter = new router_1.default();
captainApplicationsRouter.prefix('/api/applications/captains');
captainApplicationsRouter.use(authentication_1.authenticate);
captainApplicationsRouter.use(authentication_1.isElevatedUser);
captainApplicationsRouter.use(scheduleCheck_1.onGoingApplications);
captainApplicationsRouter.post('/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let app = yield CaptainApplication_1.CaptainApplication.findUserApplication(ctx.state.user.id);
    if (!app) {
        app = new CaptainApplication_1.CaptainApplication();
    }
    app.reason = ctx.request.body.reason.trim();
    app.user = ctx.state.user;
    yield app.save();
    let body = {
        error: `Couldn't create the application`,
    };
    if (app) {
        body = {
            captainApplication: app,
            success: 'Saved',
        };
    }
    ctx.body = body;
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} applied for captain`, Log_1.LOG_TYPE.User, ctx.state.user.id);
}));
exports.default = captainApplicationsRouter;
