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
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = require("../models/User");
function authenticate(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User_1.User.findOne({
            cache: true,
            where: { osuId: ctx.session.osuId },
        });
        if (user && !user.isRestricted) {
            ctx.state.user = user;
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.authenticate = authenticate;
function isStaff(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.state.user.isStaff) {
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.isStaff = isStaff;
function isCaptain(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.state.user.isCaptain) {
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.isCaptain = isCaptain;
function isJudge(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.state.user.isJudge) {
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.isJudge = isJudge;
function isElevatedUser(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.state.user.isElevatedUser) {
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.isElevatedUser = isElevatedUser;
function isBasicUser(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (ctx.state.user.isBasicUser) {
            return yield next();
        }
        else {
            if (ctx.request.type === 'application/json') {
                return ctx.body = { error: 'Unathorized' };
            }
            else {
                return ctx.render('error');
            }
        }
    });
}
exports.isBasicUser = isBasicUser;
