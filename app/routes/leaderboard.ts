import Router from '@koa/router';
import { JudgingCriteria } from '../models/judging/JudgingCriteria';
import { Round } from '../models/rounds/Round';
import { ICriteriaScore, Team } from '../models/Team';

const leaderboardRouter = new Router();

leaderboardRouter.prefix('/leaderboard');

leaderboardRouter.get('/', async (ctx) => {
    const teams = await Team
        .createQueryBuilder('team')
        .innerJoin('team.country', 'country')
        .leftJoin('team.eliminationRound', 'eliminationRound')
        .select(['team.id', 'country.id', 'country.code', 'country.name', 'eliminationRound.title'])
        .getMany();

    const query = Team
        .createQueryBuilder('team')
        .innerJoin('team.submissions', 'submission')
        .innerJoin('submission.judging', 'judging')
        .innerJoin('judging.round', 'round')
        .innerJoin('judging.judgingCriteria', 'criteria')
        .select('team.id', 'id')
        .addSelect('criteria.name', 'criteriaName')
        .addSelect('SUM(judging.score)', 'score')
        .groupBy('team.id')
        .addGroupBy('criteria.id')
        .addGroupBy('criteria.name');

    const currentRound = await Round.findCurrentRound();

    if (currentRound) {
        query.where('round.id != :roundId', { roundId: currentRound.id });
    }

    const scores = await query.getRawMany();

    if (scores && scores.length) {
        teams.map((t) => {
            const rawTeamScores = scores.filter((s) => s.id === t.id);
            const criteriaScores: ICriteriaScore[] = rawTeamScores.map((s) => {
                return {
                    criteria: s.criteriaName,
                    score: s.score,
                };
            });
            const finalScore: number = criteriaScores.map((s) => s.score).reduce((total, s) => total + s);
            t.criteriaScores = criteriaScores;
            t.finalScore = finalScore;
        });

        teams.sort((a, b) => b.finalScore - a.finalScore);
    }

    const criterias = await JudgingCriteria.find({});

    return await ctx.render('leaderboard', {
        criterias,
        path: '/leaderboard',
        teams,
    });
});

export default leaderboardRouter;