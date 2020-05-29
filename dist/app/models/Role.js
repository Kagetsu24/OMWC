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
var ROLE;
(function (ROLE) {
    ROLE[ROLE["BasicUser"] = 1] = "BasicUser";
    ROLE[ROLE["ElevatedUser"] = 2] = "ElevatedUser";
    ROLE[ROLE["Restricted"] = 3] = "Restricted";
    ROLE[ROLE["Contestant"] = 4] = "Contestant";
    ROLE[ROLE["Captain"] = 5] = "Captain";
    ROLE[ROLE["Judge"] = 6] = "Judge";
    ROLE[ROLE["Staff"] = 7] = "Staff";
})(ROLE = exports.ROLE || (exports.ROLE = {}));
let Role = class Role extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Role.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ unique: true }),
    __metadata("design:type", String)
], Role.prototype, "name", void 0);
Role = __decorate([
    typeorm_1.Entity()
], Role);
exports.Role = Role;
