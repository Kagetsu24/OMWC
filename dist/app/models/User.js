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
var User_1;
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const CaptainApplication_1 = require("./applications/CaptainApplication");
const Country_1 = require("./Country");
const RequestAccess_1 = require("./RequestAccess");
const Role_1 = require("./Role");
const MapperApplication_1 = require("./applications/MapperApplication");
let User = User_1 = class User extends typeorm_1.BaseEntity {
    static findOneOrFailWithRelevantInfo(osuId) {
        return User_1.findOneOrFail({
            where: { osuId },
            relations: [
                'country',
                'requestAccess',
                'mapperApplication',
                'captainApplication',
                'captainVote',
            ],
        });
    }
    static findOneWithRelevantInfo(osuId) {
        return User_1.findOne({
            where: { osuId },
            relations: [
                'country',
                'requestAccess',
                'mapperApplication',
                'captainApplication',
                'captainVote',
            ],
        });
    }
    getVirtuals() {
        this.isBasicUser = this.roleId === Role_1.ROLE.BasicUser;
        this.isElevatedUser = this.roleId === Role_1.ROLE.ElevatedUser;
        this.isRestricted = this.roleId === Role_1.ROLE.Restricted;
        this.isContestant = this.roleId === Role_1.ROLE.Contestant;
        this.isCaptain = this.roleId === Role_1.ROLE.Captain;
        this.isJudge = this.roleId === Role_1.ROLE.Judge;
        this.isStaff = this.roleId === Role_1.ROLE.Staff;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", Number)
], User.prototype, "osuId", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Role_1.Role, { nullable: false }),
    __metadata("design:type", Role_1.Role)
], User.prototype, "role", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Country_1.Country, (country) => country.users, { nullable: false, eager: true }),
    __metadata("design:type", Country_1.Country)
], User.prototype, "country", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "requestAccessId", void 0);
__decorate([
    typeorm_1.OneToOne(() => RequestAccess_1.RequestAccess, (requestAccess) => requestAccess.user),
    typeorm_1.JoinColumn(),
    __metadata("design:type", RequestAccess_1.RequestAccess)
], User.prototype, "requestAccess", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "mapperApplicationId", void 0);
__decorate([
    typeorm_1.OneToOne(() => MapperApplication_1.MapperApplication),
    typeorm_1.JoinColumn(),
    __metadata("design:type", MapperApplication_1.MapperApplication)
], User.prototype, "mapperApplication", void 0);
__decorate([
    typeorm_1.OneToOne(() => CaptainApplication_1.CaptainApplication),
    typeorm_1.JoinColumn(),
    __metadata("design:type", CaptainApplication_1.CaptainApplication)
], User.prototype, "captainApplication", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "captainVoteId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => CaptainApplication_1.CaptainApplication, (captainApplication) => captainApplication.userVotes),
    __metadata("design:type", CaptainApplication_1.CaptainApplication)
], User.prototype, "captainVote", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.AfterLoad(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], User.prototype, "getVirtuals", null);
User = User_1 = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
