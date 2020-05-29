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
const scheduleCheck_1 = require("../../middlewares/scheduleCheck");
const MapperApplication_1 = require("../../models/applications/MapperApplication");
const User_1 = require("../../models/User");
const Country_1 = require("../../models/Country");
const Role_1 = require("../../models/Role");
const Log_1 = require("../../models/Log");
const mappersChoiceRouter = new router_1.default();
mappersChoiceRouter.prefix('/api/applications/mappersChoice');
mappersChoiceRouter.use(authentication_1.authenticate);
mappersChoiceRouter.use(scheduleCheck_1.onGoingMappersChoice);
mappersChoiceRouter.use(authentication_1.isCaptain);
mappersChoiceRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applications = yield MapperApplication_1.MapperApplication
        .createQueryBuilder('mapperApplication')
        .innerJoinAndSelect('mapperApplication.user', 'user')
        .innerJoin('user.country', 'country')
        .where('country.id = :country', { country: ctx.state.user.country.id })
        .andWhere('user.id != :userId', { userId: ctx.state.user.id })
        .getMany();
    ctx.body = {
        applications,
    };
}));
mappersChoiceRouter.post('/save', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const chosenAppsIds = helpers_1.convertToArray(ctx.request.body.chosenAppsIds);
    const captain = ctx.state.user;
    const country = yield Country_1.Country.findOneOrFail({ id: captain.country.id });
    let applications = yield MapperApplication_1.MapperApplication.findByIds(chosenAppsIds, { relations: ['user'] });
    applications = applications.filter((a) => a.user.country.id === country.id && a.user.id !== captain.id);
    const mappers = applications.map((a) => a.user);
    if (mappers.length < 2 || mappers.length > 6) {
        return ctx.body = {
            error: 'You need to pick between 2 and 6 members',
        };
    }
    const currentContestants = yield User_1.User.find({
        roleId: Role_1.ROLE.Contestant,
        country,
    });
    for (const contestant of currentContestants) {
        if (!mappers.some(m => m.id === contestant.id)) {
            contestant.roleId = Role_1.ROLE.BasicUser;
            yield contestant.save();
        }
    }
    for (const mapper of mappers) {
        mapper.roleId = Role_1.ROLE.Contestant;
        yield mapper.save();
    }
    ctx.body = {
        success: 'Saved',
    };
    yield Log_1.Log.createAndSave(`${ctx.state.user.username} submitted its mappers choice`, Log_1.LOG_TYPE.User, ctx.state.user.id);
}));
exports.default = mappersChoiceRouter;
