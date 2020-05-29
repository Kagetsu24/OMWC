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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const osuApi = __importStar(require("../middlewares/osuApi"));
const Country_1 = require("../models/Country");
const Role_1 = require("../models/Role");
const Round_1 = require("../models/rounds/Round");
const Schedule_1 = require("../models/Schedule");
const User_1 = require("../models/User");
const indexRouter = new router_1.default();
indexRouter.get('/api/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const schedule = yield Schedule_1.Schedule.findOne({});
    const judgingRound = yield Round_1.Round.findCurrentJudgingRound();
    const osuId = (_a = ctx.session) === null || _a === void 0 ? void 0 : _a.osuId;
    let user;
    if (osuId) {
        user = yield User_1.User.findOneWithRelevantInfo(osuId);
    }
    ctx.body = {
        judgingRound,
        schedule,
        user,
    };
}));
indexRouter.get('/login', (ctx) => {
    const state = osuApi.generateState();
    ctx.cookies.set('_state', state);
    ctx.session.redirectTo = ctx.request.header.referer;
    return ctx.redirect(osuApi.generateAuthorizeUrl(state));
});
indexRouter.get('/callback', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    if (!ctx.query.code || ctx.query.error) {
        return ctx.redirect('/');
    }
    const decodedState = osuApi.decodeState(ctx.query.state);
    const savedState = ctx.cookies.get('_state');
    ctx.cookies.set('_state', undefined);
    if (decodedState !== savedState) {
        return ctx.render('error');
    }
    const response = yield osuApi.getToken(ctx.query.code);
    if (osuApi.isRequestError(response)) {
        return ctx.render('error');
    }
    else {
        ctx.session.accessToken = response.access_token;
        ctx.session.refreshToken = response.refresh_token;
        const userResponse = yield osuApi.getUserInfo(response.access_token);
        if (osuApi.isRequestError(userResponse)) {
            ctx.session = null;
            return ctx.render('error');
        }
        ctx.session.osuId = userResponse.id;
        ctx.session.username = userResponse.username;
        let country = yield Country_1.Country.findOne({ where: { name: userResponse.country.name } });
        if (!country) {
            country = yield Country_1.Country.create({
                code: userResponse.country.code,
                name: userResponse.country.name,
            }).save();
        }
        let user = yield User_1.User.findOne({ where: { osuId: userResponse.id } });
        if (!user) {
            const hasRankedMap = userResponse.ranked_and_approved_beatmapset_count > 0;
            user = yield User_1.User.create({
                country,
                osuId: userResponse.id,
                roleId: hasRankedMap ? Role_1.ROLE.ElevatedUser : Role_1.ROLE.BasicUser,
                username: userResponse.username,
            }).save();
        }
        if (user) {
            const redirectUrl = ((_b = ctx.session) === null || _b === void 0 ? void 0 : _b.redirectTo) || '/';
            ctx.session.redirectUrl = null;
            return ctx.redirect(redirectUrl);
        }
        ctx.session = null;
        return ctx.render('error');
    }
}));
exports.default = indexRouter;
