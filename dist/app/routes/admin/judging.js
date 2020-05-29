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
const Round_1 = require("../../models/rounds/Round");
const judgingAdminRouter = new router_1.default();
judgingAdminRouter.prefix('/api/admin/judging');
judgingAdminRouter.use(authentication_1.authenticate);
judgingAdminRouter.use(authentication_1.isStaff);
judgingAdminRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = yield Round_1.Round.find({
        order: {
            judgingEndedAt: 'DESC',
        },
        relations: [
            'matches',
            'matches.teamA',
            'matches.teamB',
            'matches.eliminationJudging',
            'matches.eliminationJudging.submissionChosen',
            'matches.eliminationJudging.submissionChosen.country',
            'matches.eliminationJudging.judge',
            'matches.submissions',
            'matches.submissions.country',
            'matches.submissions.qualifierJudging',
            'matches.submissions.qualifierJudging.judge',
            'matches.submissions.qualifierJudging.qualifierJudgingToCriterias',
            'matches.submissions.qualifierJudging.qualifierJudgingToCriterias.criteria',
            'matches.submissions.eliminationJudging',
            'matches.submissions.eliminationJudging.judge',
        ],
    });
    ctx.body = {
        rounds,
    };
}));
exports.default = judgingAdminRouter;
