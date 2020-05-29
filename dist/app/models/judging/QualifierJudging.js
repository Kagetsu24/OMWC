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
const QualifierJudgingToCriteria_1 = require("./QualifierJudgingToCriteria");
let QualifierJudging = class QualifierJudging extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QualifierJudging.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QualifierJudging.prototype, "judgeId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, { nullable: false }),
    __metadata("design:type", User_1.User)
], QualifierJudging.prototype, "judge", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QualifierJudging.prototype, "submissionId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Submission_1.Submission, (submission) => submission.qualifierJudging, { nullable: false }),
    __metadata("design:type", Submission_1.Submission)
], QualifierJudging.prototype, "submission", void 0);
__decorate([
    typeorm_1.OneToMany(() => QualifierJudgingToCriteria_1.QualifierJudgingToCriteria, qualifierJudgingToCriteria => qualifierJudgingToCriteria.qualifierJudging),
    __metadata("design:type", Array)
], QualifierJudging.prototype, "qualifierJudgingToCriterias", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], QualifierJudging.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], QualifierJudging.prototype, "updatedAt", void 0);
QualifierJudging = __decorate([
    typeorm_1.Entity()
], QualifierJudging);
exports.QualifierJudging = QualifierJudging;
