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
const User_1 = require("./User");
var STATUS;
(function (STATUS) {
    STATUS["Pending"] = "Pending";
    STATUS["Accepted"] = "Accepted";
    STATUS["Rejected"] = "Rejected";
})(STATUS = exports.STATUS || (exports.STATUS = {}));
let RequestAccess = class RequestAccess extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RequestAccess.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], RequestAccess.prototype, "mapLink", void 0);
__decorate([
    typeorm_1.Column({ type: 'enum', enum: STATUS, default: STATUS.Pending }),
    __metadata("design:type", String)
], RequestAccess.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(() => User_1.User, (user) => user.requestAccess, { nullable: false }),
    __metadata("design:type", User_1.User)
], RequestAccess.prototype, "user", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], RequestAccess.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], RequestAccess.prototype, "updatedAt", void 0);
RequestAccess = __decorate([
    typeorm_1.Entity()
], RequestAccess);
exports.RequestAccess = RequestAccess;
