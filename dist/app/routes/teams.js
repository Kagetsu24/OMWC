"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("@koa/router"));
const Country_1 = require("../models/Country");
const Role_1 = require("../models/Role");
const typeorm_1 = require("typeorm");
const teamsRouter = new router_1.default();
teamsRouter.prefix('/api/teams');
teamsRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const teams = yield Country_1.Country
        .createQueryBuilder('country')
        .innerJoinAndSelect('country.users', 'users')
        .where('country.wasConfirmed = 1')
        .andWhere(new typeorm_1.Brackets(qb => {
        qb.where('users.roleId = :captain', { captain: Role_1.ROLE.Captain })
            .orWhere('users.roleId = :contestant', { contestant: Role_1.ROLE.Contestant });
    }))
        .orderBy('country.name', 'ASC')
        .addOrderBy('users.roleId', 'DESC')
        .getMany();
    ctx.body = {
        teams,
    };
}));
exports.default = teamsRouter;
