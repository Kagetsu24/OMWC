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
const helpers_1 = require("../../helpers");
const authentication_1 = require("../../middlewares/authentication");
const Country_1 = require("../../models/Country");
const Role_1 = require("../../models/Role");
const teamsChoiceAdminRouter = new router_1.default();
teamsChoiceAdminRouter.prefix('/api/admin/teamsChoice');
teamsChoiceAdminRouter.use(authentication_1.authenticate);
teamsChoiceAdminRouter.use(authentication_1.isStaff);
teamsChoiceAdminRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const countries = yield Country_1.Country
        .createQueryBuilder('country')
        .innerJoin('country.users', 'user')
        .where('user.mapperApplicationId IS NOT NULL')
        .orWhere('user.roleId = :captain', { captain: Role_1.ROLE.Captain })
        .orWhere('user.roleId = :contestant', { contestant: Role_1.ROLE.Contestant })
        .select([
        'country.id',
        'country.name',
        'country.wasConfirmed',
        'country.code',
        'user.id',
        'user.username',
        'user.osuId',
        'user.roleId',
        'user.mapperApplicationId',
    ])
        .orderBy('country.name', 'ASC')
        .getMany();
    ctx.body = {
        countries,
    };
}));
teamsChoiceAdminRouter.post('/confirm', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const countryId = helpers_1.convertToIntOrThrow(ctx.request.body.countryId);
    const country = yield Country_1.Country.findOneOrFail({ id: countryId });
    country.wasConfirmed = true;
    yield country.save();
    ctx.body = {
        success: 'Saved',
    };
}));
teamsChoiceAdminRouter.post('/remove', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const countryId = helpers_1.convertToIntOrThrow(ctx.request.body.countryId);
    const country = yield Country_1.Country.findOneOrFail({ id: countryId });
    country.wasConfirmed = false;
    yield country.save();
    ctx.body = {
        success: 'Saved',
    };
}));
exports.default = teamsChoiceAdminRouter;
