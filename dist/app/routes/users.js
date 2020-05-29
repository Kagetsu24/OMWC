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
const authentication_1 = require("../middlewares/authentication");
const RequestAccess_1 = require("../models/RequestAccess");
const User_1 = require("../models/User");
const helpers_1 = require("../helpers");
const discordWebhook_1 = require("../discordWebhook");
const Log_1 = require("../models/Log");
const usersRouter = new router_1.default();
usersRouter.prefix('/api/users');
usersRouter.use(authentication_1.authenticate);
usersRouter.post('/requestAccess', authentication_1.isBasicUser, (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!helpers_1.isOsuUrl(ctx.request.body.mapLink)) {
        return ctx.body = {
            error: `Not a valid link`,
        };
    }
    let user = ctx.state.user;
    if (user.requestAccessId) {
        return ctx.body = {
            error: `You've already requested access`,
        };
    }
    const request = new RequestAccess_1.RequestAccess();
    request.mapLink = ctx.request.body.mapLink;
    request.user = ctx.state.user;
    yield request.save();
    user = yield User_1.User.findOneOrFailWithRelevantInfo(ctx.state.user.osuId);
    yield discordWebhook_1.webhookPost([{
            author: {
                name: 'Access Request !',
                url: request.mapLink,
            },
            title: `${user.username}`,
            url: `https://osu.ppy.sh/users/${user.osuId}`,
            color: 14177041,
        }]);
    ctx.body = {
        user,
    };
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} requests access`, Log_1.LOG_TYPE.User, ctx.state.user.id);
}));
exports.default = usersRouter;
