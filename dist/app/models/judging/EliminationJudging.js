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
const Submission_1 = require("../rounds/Submission");
const User_1 = require("../User");
const Match_1 = require("../rounds/Match");
let EliminationJudging = class EliminationJudging extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], EliminationJudging.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EliminationJudging.prototype, "comment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], EliminationJudging.prototype, "judgeId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, { nullable: false }),
    __metadata("design:type", User_1.User)
], EliminationJudging.prototype, "judge", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], EliminationJudging.prototype, "matchId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Match_1.Match, (match) => match.eliminationJudging, { nullable: false }),
    __metadata("design:type", Match_1.Match)
], EliminationJudging.prototype, "match", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], EliminationJudging.prototype, "submissionChosenId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Submission_1.Submission, (submission) => submission.eliminationJudging, { nullable: false }),
    __metadata("design:type", Submission_1.Submission)
], EliminationJudging.prototype, "submissionChosen", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], EliminationJudging.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], EliminationJudging.prototype, "updatedAt", void 0);
EliminationJudging = __decorate([
    typeorm_1.Entity()
], EliminationJudging);
exports.EliminationJudging = EliminationJudging;
