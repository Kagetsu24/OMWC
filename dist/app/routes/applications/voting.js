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
const helpers_1 = require("../../helpers");
const Log_1 = require("../../models/Log");
const captainVotingRouter = new router_1.default();
captainVotingRouter.prefix('/api/applications/voting/');
captainVotingRouter.use(authentication_1.authenticate);
captainVotingRouter.use(authentication_1.isElevatedUser);
captainVotingRouter.use(scheduleCheck_1.onGoingCaptainVoting);
captainVotingRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield CaptainApplication_1.CaptainApplication
        .createQueryBuilder('captainApplication')
        .innerJoinAndSelect('captainApplication.user', 'user')
        .innerJoin('user.country', 'country')
        .where('country.id = :country', { country: ctx.state.user.country.id })
        .getMany();
    ctx.body = {
        applications,
    };
}));
captainVotingRouter.post('/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = helpers_1.convertToIntOrThrow(ctx.request.body.applicationId);
    const application = yield CaptainApplication_1.CaptainApplication.findOneOrFailWithUser(applicationId);
    const isAnotherPerson = application.user.id !== ctx.state.user.id;
    const isSameCountry = application.user.country.id === ctx.state.user.country.id;
    if (isSameCountry && isAnotherPerson) {
        const isCancelingVote = ctx.state.user.captainVoteId === application.id;
        if (isCancelingVote) {
            ctx.state.user.captainVoteId = null;
        }
        else {
            ctx.state.user.captainVoteId = application.id;
        }
        yield ctx.state.user.save();
        return ctx.body = {
            application: isCancelingVote ? null : application,
        };
    }
    ctx.body = {
        error: `It's not a valid vote`,
    };
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} submitted its vote for ${application.user.username}`, Log_1.LOG_TYPE.User, ctx.state.user.id);
}));
exports.default = captainVotingRouter;
