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
const Schedule_1 = require("../../models/Schedule");
const scheduleAdminRouter = new router_1.default();
scheduleAdminRouter.prefix('/api/admin/schedule');
scheduleAdminRouter.use(authentication_1.authenticate);
scheduleAdminRouter.use(authentication_1.isStaff);
scheduleAdminRouter.post('/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    if (!ctx.request.body.applicationsStartedAt.date ||
        !ctx.request.body.applicationsEndedAt.date ||
        !ctx.request.body.captainVotingStartedAt.date ||
        !ctx.request.body.captainVotingEndedAt.date ||
        !ctx.request.body.mappersChoiceStartedAt.date ||
        !ctx.request.body.mappersChoiceEndedAt.date ||
        ctx.request.body.applicationsStartedAt.date > ctx.request.body.applicationsEndedAt.date ||
        ctx.request.body.captainVotingStartedAt.date > ctx.request.body.captainVotingEndedAt.date ||
        ctx.request.body.mappersChoiceStartedAt.date > ctx.request.body.mappersChoiceEndedAt.date) {
        return ctx.body = {
            error: `Dates don't make sense`,
        };
    }
    let schedule = yield Schedule_1.Schedule.findOne();
    if (!schedule) {
        schedule = new Schedule_1.Schedule();
    }
    schedule.applicationsStartedAt = ctx.request.body.applicationsStartedAt.date;
    schedule.applicationsEndedAt = ctx.request.body.applicationsEndedAt.date;
    schedule.captainVotingStartedAt = ctx.request.body.captainVotingStartedAt.date;
    schedule.captainVotingEndedAt = ctx.request.body.captainVotingEndedAt.date;
    schedule.mappersChoiceStartedAt = ctx.request.body.mappersChoiceStartedAt.date;
    schedule.mappersChoiceEndedAt = ctx.request.body.mappersChoiceEndedAt.date;
    yield schedule.save();
    ctx.body = {
        schedule,
    };
}));
exports.default = scheduleAdminRouter;
