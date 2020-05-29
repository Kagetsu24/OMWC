"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var Match_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Submission_1 = require("./Submission");
const Round_1 = require("./Round");
const EliminationJudging_1 = require("../judging/EliminationJudging");
const Country_1 = require("../Country");
let Match = Match_1 = class Match extends typeorm_1.BaseEntity {
    static findByRoundWithSubmissions(roundId) {
        return Match_1.find({
            where: { roundId },
            relations: ['submissions'],
        });
    }
    static findRelatedCountryMatch(round, countryId) {
        if (round.isQualifier) {
            return Match_1.findOne({ roundId: round.id });
        }
        else {
            return Match_1
                .createQueryBuilder('match')
                .where('match.roundId = :roundId', { roundId: round.id })
                .andWhere(new typeorm_1.Brackets(qb => {
                qb.where('match.teamAId = :teamAId', { teamAId: countryId })
                    .orWhere('match.teamBId = :teamBId', { teamBId: countryId });
            }))
                .getOne();
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Match.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: true, length: 3000 }),
    __metadata("design:type", String)
], Match.prototype, "information", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Match.prototype, "roundId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "teamAId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Match.prototype, "teamBId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Round_1.Round, { nullable: false }),
    __metadata("design:type", Round_1.Round)
], Match.prototype, "round", void 0);
__decorate([
    typeorm_1.OneToMany(() => Submission_1.Submission, (submission) => submission.match),
    __metadata("design:type", Array)
], Match.prototype, "submissions", void 0);
__decorate([
    typeorm_1.OneToMany(() => EliminationJudging_1.EliminationJudging, (eliminationJudging) => eliminationJudging.match),
    __metadata("design:type", Array)
], Match.prototype, "eliminationJudging", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Country_1.Country, (country) => country.matchesA),
    __metadata("design:type", Country_1.Country)
], Match.prototype, "teamA", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Country_1.Country, (country) => country.matchesB),
    __metadata("design:type", Country_1.Country)
], Match.prototype, "teamB", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Match.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Match.prototype, "updatedAt", void 0);
Match = Match_1 = __decorate([
    typeorm_1.Entity()
], Match);
exports.Match = Match;
