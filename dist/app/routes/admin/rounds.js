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
const helpers_1 = require("../../helpers");
const authentication_1 = require("../../middlewares/authentication");
const Round_1 = require("../../models/rounds/Round");
const Match_1 = require("../../models/rounds/Match");
const Country_1 = require("../../models/Country");
const roundsAdminRouter = new router_1.default();
roundsAdminRouter.prefix('/api/admin/rounds/');
roundsAdminRouter.use(authentication_1.authenticate);
roundsAdminRouter.use(authentication_1.isStaff);
roundsAdminRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = yield Round_1.Round.find({});
    ctx.body = {
        rounds,
    };
}));
roundsAdminRouter.get('/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const round = yield Round_1.Round.findOneOrFail({
        where: { id: ctx.params.id },
        relations: ['matches'],
    });
    const competingTeams = Country_1.Country.find({ wasConfirmed: true });
    ctx.body = {
        round,
        competingTeams,
    };
}));
roundsAdminRouter.post('/store', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const roundInput = ctx.request.body.round;
    const round = new Round_1.Round();
    if (!roundInput.title ||
        !roundInput.submissionsStartedAt ||
        !roundInput.submissionsEndedAt ||
        !roundInput.judgingStartedAt ||
        !roundInput.judgingEndedAt ||
        !roundInput.resultsAt) {
        return ctx.body = {
            error: 'Not valid inputs',
        };
    }
    round.title = roundInput.title.trim();
    round.submissionsStartedAt = roundInput.submissionsStartedAt;
    round.submissionsEndedAt = roundInput.submissionsEndedAt;
    round.judgingStartedAt = roundInput.judgingStartedAt;
    round.judgingEndedAt = roundInput.judgingEndedAt;
    round.resultsAt = roundInput.resultsAt;
    round.isQualifier = roundInput.isQualifier;
    yield round.save();
    if (round.isQualifier) {
        const newMatch = new Match_1.Match();
        newMatch.round = round;
        newMatch.information = 'All vs All';
        yield newMatch.save();
    }
    ctx.body = {
        round,
    };
}));
roundsAdminRouter.post('/:id/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const roundInput = ctx.request.body.round;
    if (!roundInput.title ||
        !roundInput.submissionsStartedAt ||
        !roundInput.submissionsEndedAt ||
        !roundInput.judgingStartedAt ||
        !roundInput.judgingEndedAt ||
        !roundInput.resultsAt) {
        return ctx.body = {
            error: 'Not valid inputs',
        };
    }
    const roundId = helpers_1.convertToIntOrThrow(ctx.params.id);
    const round = yield Round_1.Round.findOneOrFail({ id: roundId });
    round.title = roundInput.title.trim();
    round.submissionsStartedAt = roundInput.submissionsStartedAt;
    round.submissionsEndedAt = roundInput.submissionsEndedAt;
    round.judgingStartedAt = roundInput.judgingStartedAt;
    round.judgingEndedAt = roundInput.judgingEndedAt;
    round.resultsAt = roundInput.resultsAt;
    round.isQualifier = roundInput.isQualifier;
    yield round.save();
    if (round.isQualifier) {
        let match = yield Match_1.Match.findOne({
            round,
        });
        if (!match) {
            match = new Match_1.Match();
            match.round = round;
        }
        match.information = 'All vs All';
        yield match.save();
    }
    ctx.body = {
        round,
    };
}));
roundsAdminRouter.get('/:id/matches', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const [matches, competingTeams] = yield Promise.all([
        Match_1.Match.findByRoundWithSubmissions(ctx.params.id),
        Country_1.Country.find({ wasConfirmed: true }),
    ]);
    ctx.body = {
        matches,
        competingTeams,
    };
}));
roundsAdminRouter.post('/:id/matches/store', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const roundId = helpers_1.convertToIntOrThrow(ctx.params.id);
    const round = yield Round_1.Round.findOneOrFail({ id: roundId });
    const newMatch = ctx.request.body.match;
    const match = new Match_1.Match();
    match.round = round;
    match.information = ((_a = newMatch.information) === null || _a === void 0 ? void 0 : _a.trim()) || null;
    if (!round.isQualifier) {
        const [teamA, teamB] = yield Promise.all([
            Country_1.Country.findOne({ id: newMatch.teamAId }),
            Country_1.Country.findOne({ id: newMatch.teamBId }),
        ]);
        if (!teamA || !teamB) {
            return ctx.body = {
                error: 'Missing a team',
            };
        }
        match.teamA = teamA;
        match.teamB = teamB;
    }
    yield match.save();
    const matches = yield Match_1.Match.findByRoundWithSubmissions(round.id);
    ctx.body = {
        matches,
    };
}));
roundsAdminRouter.post('/:id/matches/:matchId/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const roundId = helpers_1.convertToIntOrThrow(ctx.params.id);
    const matchId = helpers_1.convertToIntOrThrow(ctx.params.matchId);
    const round = yield Round_1.Round.findOneOrFail({ id: roundId });
    const editingMatch = ctx.request.body.match;
    const match = yield Match_1.Match.findOneOrFail({
        where: { id: matchId },
        relations: ['teamA', 'teamB'],
    });
    match.information = ((_b = editingMatch.information) === null || _b === void 0 ? void 0 : _b.trim()) || null;
    if (!round.isQualifier) {
        const [teamA, teamB] = yield Promise.all([
            Country_1.Country.findOne({ id: editingMatch.teamAId }),
            Country_1.Country.findOne({ id: editingMatch.teamBId }),
        ]);
        if (!teamA || !teamB) {
            return ctx.body = {
                error: 'Missing a team',
            };
        }
        match.teamA = teamA;
        match.teamB = teamB;
    }
    yield match.save();
    const matches = yield Match_1.Match.findByRoundWithSubmissions(round.id);
    ctx.body = {
        matches,
    };
}));
roundsAdminRouter.post('/:id/matches/:matchId/remove', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const roundId = helpers_1.convertToIntOrThrow(ctx.params.id);
    const matchId = helpers_1.convertToIntOrThrow(ctx.params.matchId);
    const match = yield Match_1.Match.findOneOrFail({ id: matchId });
    yield match.remove();
    const matches = yield Match_1.Match.findByRoundWithSubmissions(roundId);
    ctx.body = {
        matches,
    };
}));
exports.default = roundsAdminRouter;
