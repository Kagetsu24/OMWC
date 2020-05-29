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
const MapperApplication_1 = require("../../models/applications/MapperApplication");
const Log_1 = require("../../models/Log");
const mapperApplicationsRouter = new router_1.default();
mapperApplicationsRouter.prefix('/api/applications/mappers');
mapperApplicationsRouter.use(authentication_1.authenticate);
mapperApplicationsRouter.use(scheduleCheck_1.onGoingApplications);
mapperApplicationsRouter.post('/store', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    let app = yield MapperApplication_1.MapperApplication.findUserApplication(ctx.state.user.id);
    if (app) {
        return ctx.body = {
            error: 'Already applied.',
        };
    }
    app = new MapperApplication_1.MapperApplication();
    app.user = ctx.state.user;
    yield app.save();
    if (app) {
        return ctx.body = {
            mapperApplication: app,
        };
    }
    ctx.body = {
        error: `Couldn't create the application`,
    };
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} applied for mapper`, Log_1.LOG_TYPE.User, ctx.state.user.id);
}));
exports.default = mapperApplicationsRouter;
