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
const User_1 = require("../User");
let CaptainApplication = class CaptainApplication extends typeorm_1.BaseEntity {
    static findUserApplication(userId) {
        return this
            .createQueryBuilder('captainApplication')
            .innerJoinAndSelect('captainApplication.user', 'user')
            .where('user.id = :userId', { userId })
            .getOne();
    }
    static findOneOrFailWithUser(captainApplicationId) {
        return this.findOneOrFail({
            relations: ['user'],
            where: { id: captainApplicationId },
        });
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], CaptainApplication.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ length: 3000 }),
    __metadata("design:type", String)
], CaptainApplication.prototype, "reason", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.User, user => user.captainApplication),
    __metadata("design:type", User_1.User)
], CaptainApplication.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(() => User_1.User, user => user.captainVote),
    __metadata("design:type", Array)
], CaptainApplication.prototype, "userVotes", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], CaptainApplication.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], CaptainApplication.prototype, "updatedAt", void 0);
CaptainApplication = __decorate([
    typeorm_1.Entity()
], CaptainApplication);
exports.CaptainApplication = CaptainApplication;
