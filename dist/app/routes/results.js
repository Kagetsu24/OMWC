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
const path_1 = __importDefault(require("path"));
const Criteria_1 = require("../models/judging/Criteria");
const Round_1 = require("../models/rounds/Round");
const downloadSubmission_1 = require("../middlewares/downloadSubmission");
const resultsRouter = new router_1.default();
resultsRouter.prefix('/api/results');
resultsRouter.get('/qualifiers', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const qualifier = yield Round_1.Round
        .createQueryBuilder('round')
        .innerJoinAndSelect('round.matches', 'matches')
        .leftJoinAndSelect('matches.submissions', 'submissions', 'round.resultsAt <= :today', { today: new Date() })
        .leftJoinAndSelect('submissions.country', 'country')
        .leftJoinAndSelect('submissions.qualifierJudging', 'qualifierJudging')
        .leftJoinAndSelect('qualifierJudging.judge', 'judge')
        .leftJoinAndSelect('qualifierJudging.qualifierJudgingToCriterias', 'qualifierJudgingToCriterias')
        .leftJoinAndSelect('qualifierJudgingToCriterias.criteria', 'criteria')
        .where('round.isQualifier = true')
        .getOne();
    const criterias = yield Criteria_1.Criteria.find({});
    const judges = (_e = (_d = (_c = (_b = (_a = qualifier === null || qualifier === void 0 ? void 0 : qualifier.matches) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.submissions) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.qualifierJudging) === null || _e === void 0 ? void 0 : _e.map(j => j.judge);
    return ctx.body = {
        criterias,
        qualifier,
        judges,
    };
}));
resultsRouter.get('/elimination', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = yield Round_1.Round
        .createQueryBuilder('round')
        .innerJoinAndSelect('round.matches', 'matches')
        .leftJoinAndSelect('matches.teamA', 'teamA')
        .leftJoinAndSelect('matches.teamB', 'teamB')
        .leftJoinAndSelect('matches.submissions', 'submissions', 'round.resultsAt <= :today', { today: new Date() })
        .leftJoinAndSelect('submissions.country', 'sub_country')
        .leftJoinAndSelect('matches.eliminationJudging', 'eliminationJudging', 'round.resultsAt <= :today', { today: new Date() })
        .leftJoinAndSelect('eliminationJudging.judge', 'judge')
        .leftJoinAndSelect('eliminationJudging.submissionChosen', 'submissionChosen')
        .leftJoinAndSelect('submissionChosen.country', 'country')
        .where('round.isQualifier = false')
        .orderBy('round.id', 'ASC')
        .getMany();
    const today = new Date();
    const currentRound = rounds.find(r => new Date(r.submissionsStartedAt) <= today &&
        new Date(r.resultsAt) >= today);
    return ctx.body = {
        rounds,
        currentRound,
    };
}));
resultsRouter.get('/download/:id', downloadSubmission_1.findSubmission, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = ctx.state.submission;
    if (new Date(submission.match.round.resultsAt) > new Date()) {
        return ctx.body = {
            error: 'Unathorized',
        };
    }
    ctx.state.baseDir = path_1.default.join(__dirname, '../../osz/originals/');
    ctx.state.downloadPath = submission.originalPath;
    return yield next();
}), downloadSubmission_1.download);
exports.default = resultsRouter;
