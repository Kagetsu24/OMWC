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
const CaptainApplication_1 = require("../../models/applications/CaptainApplication");
const Country_1 = require("../../models/Country");
const User_1 = require("../../models/User");
const Role_1 = require("../../models/Role");
const captainChoiceAdminRouter = new router_1.default();
captainChoiceAdminRouter.prefix('/api/admin/captainChoice');
captainChoiceAdminRouter.use(authentication_1.authenticate);
captainChoiceAdminRouter.use(authentication_1.isStaff);
captainChoiceAdminRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationsByCountry = yield Country_1.Country
        .createQueryBuilder('country')
        .innerJoin('country.users', 'user')
        .innerJoin('user.captainApplication', 'captainApplication')
        .leftJoin('captainApplication.userVotes', 'userVote')
        .select([
        'country.name',
        'country.code',
        'user.osuId',
        'user.username',
        'user.roleId',
        'captainApplication.id',
        'captainApplication.reason',
        'userVote.osuId',
        'userVote.username',
    ])
        .orderBy('country.name', 'ASC')
        .getMany();
    ctx.body = {
        applicationsByCountry,
    };
}));
captainChoiceAdminRouter.post('/choose', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = helpers_1.convertToIntOrThrow(ctx.request.body.applicationId);
    const application = yield CaptainApplication_1.CaptainApplication.findOneOrFailWithUser(applicationId);
    const user = yield User_1.User.findOneOrFail({ id: application.user.id });
    const currentCaptain = yield User_1.User.findOne({
        roleId: Role_1.ROLE.Captain,
        country: user.country,
    });
    if (currentCaptain) {
        return ctx.body = {
            error: `There's already a captain for the team`,
        };
    }
    user.roleId = Role_1.ROLE.Captain;
    yield user.save();
    ctx.body = {
        success: 'ok',
    };
}));
captainChoiceAdminRouter.post('/remove', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const applicationId = helpers_1.convertToIntOrThrow(ctx.request.body.applicationId);
    const application = yield CaptainApplication_1.CaptainApplication.findOneOrFailWithUser(applicationId);
    const user = yield User_1.User.findOneOrFail({ id: application.user.id });
    user.roleId = Role_1.ROLE.ElevatedUser;
    yield user.save();
    ctx.body = {
        success: 'ok',
    };
}));
exports.default = captainChoiceAdminRouter;
