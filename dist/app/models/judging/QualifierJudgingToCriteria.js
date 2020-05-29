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
const QualifierJudging_1 = require("./QualifierJudging");
const Criteria_1 = require("./Criteria");
let QualifierJudgingToCriteria = class QualifierJudgingToCriteria extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], QualifierJudgingToCriteria.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QualifierJudgingToCriteria.prototype, "qualifierJudgingId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QualifierJudgingToCriteria.prototype, "criteriaId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => QualifierJudging_1.QualifierJudging, qualifierJudging => qualifierJudging.qualifierJudgingToCriterias),
    __metadata("design:type", QualifierJudging_1.QualifierJudging)
], QualifierJudgingToCriteria.prototype, "qualifierJudging", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Criteria_1.Criteria, criteria => criteria.qualifierJudgingToCriterias),
    __metadata("design:type", Criteria_1.Criteria)
], QualifierJudgingToCriteria.prototype, "criteria", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], QualifierJudgingToCriteria.prototype, "score", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], QualifierJudgingToCriteria.prototype, "comment", void 0);
QualifierJudgingToCriteria = __decorate([
    typeorm_1.Entity()
], QualifierJudgingToCriteria);
exports.QualifierJudgingToCriteria = QualifierJudgingToCriteria;
