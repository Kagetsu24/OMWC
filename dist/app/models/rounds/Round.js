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
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Match_1 = require("./Match");
let Round = class Round extends typeorm_1.BaseEntity {
    static findCurrentSubmissionRound() {
        const today = new Date();
        return this.findOne({
            where: {
                submissionsEndedAt: typeorm_1.MoreThanOrEqual(today),
                submissionsStartedAt: typeorm_1.LessThanOrEqual(today),
            },
        });
    }
    static findCurrentJudgingRound() {
        const today = new Date();
        return this.findOne({
            where: {
                judgingEndedAt: typeorm_1.MoreThanOrEqual(today),
                judgingStartedAt: typeorm_1.LessThanOrEqual(today),
            },
        });
    }
    static findCurrentRound() {
        const today = new Date();
        return this.findOne({
            where: [
                {
                    submissionsEndedAt: typeorm_1.MoreThanOrEqual(today),
                    submissionsStartedAt: typeorm_1.LessThanOrEqual(today),
                },
                {
                    judgingEndedAt: typeorm_1.MoreThanOrEqual(today),
                    judgingStartedAt: typeorm_1.LessThanOrEqual(today),
                },
            ],
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Round.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Round.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], Round.prototype, "submissionsStartedAt", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], Round.prototype, "submissionsEndedAt", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], Round.prototype, "judgingStartedAt", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], Round.prototype, "judgingEndedAt", void 0);
__decorate([
    typeorm_1.Column('date'),
    __metadata("design:type", Date)
], Round.prototype, "resultsAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => Match_1.Match, (match) => match.round),
    __metadata("design:type", Array)
], Round.prototype, "matches", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Round.prototype, "isQualifier", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Round.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Round.prototype, "updatedAt", void 0);
Round = __decorate([
    typeorm_1.Entity()
], Round);
exports.Round = Round;
