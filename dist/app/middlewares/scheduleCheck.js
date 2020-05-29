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
Object.defineProperty(exports, "__esModule", { value: true });
const Schedule_1 = require("../models/Schedule");
function getSchedule() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Schedule_1.Schedule.findOne();
    });
}
function hasApplicationsStarted(schedule) {
    return (new Date() >= new Date(schedule.applicationsStartedAt));
}
function hasApplicationsEnded(schedule) {
    return (schedule.applicationsEndedAt && new Date() >= new Date(schedule.applicationsEndedAt));
}
function onGoingApplications(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schedule = yield getSchedule();
        if (!schedule) {
            return ctx.body = {
                error: 'No schedule available',
            };
        }
        const hasStarted = hasApplicationsStarted(schedule);
        const hasEnded = hasApplicationsEnded(schedule);
        const onGoing = (hasStarted &&
            !hasEnded);
        if (onGoing) {
            return yield next();
        }
        else {
            return ctx.body = {
                error: `It's not the time for applications`,
            };
        }
    });
}
exports.onGoingApplications = onGoingApplications;
function onGoingCaptainVoting(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schedule = yield getSchedule();
        if (!schedule) {
            return ctx.body = {
                error: 'No schedule available',
            };
        }
        const hasStarted = (schedule.captainVotingStartedAt && new Date() >= new Date(schedule.captainVotingStartedAt));
        const hasEnded = (schedule.captainVotingEndedAt && new Date() >= new Date(schedule.captainVotingEndedAt));
        const onGoing = (hasStarted &&
            !hasEnded);
        if (onGoing) {
            return yield next();
        }
        else {
            return ctx.body = {
                error: `It's not the time for captain voting`,
            };
        }
    });
}
exports.onGoingCaptainVoting = onGoingCaptainVoting;
function onGoingMappersChoice(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const schedule = yield getSchedule();
        if (!schedule) {
            return ctx.body = {
                error: 'No schedule available',
            };
        }
        const hasStarted = (schedule.mappersChoiceStartedAt && new Date() >= new Date(schedule.mappersChoiceStartedAt));
        const hasEnded = (schedule.mappersChoiceEndedAt && new Date() >= new Date(schedule.mappersChoiceEndedAt));
        const onGoing = (hasStarted &&
            !hasEnded);
        if (onGoing) {
            return yield next();
        }
        else {
            return ctx.body = {
                error: `It's not the time for mappers choice`,
            };
        }
    });
}
exports.onGoingMappersChoice = onGoingMappersChoice;
