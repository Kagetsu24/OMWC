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
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_helmet_1 = __importDefault(require("koa-helmet"));
const koa_session_1 = __importDefault(require("koa-session"));
const koa_static_1 = __importDefault(require("koa-static"));
const koa_views_1 = __importDefault(require("koa-views"));
const path_1 = __importDefault(require("path"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const config_json_1 = __importDefault(require("../config.json"));
const routes_1 = __importDefault(require("./routes"));
const captainChoice_1 = __importDefault(require("./routes/admin/captainChoice"));
const judging_1 = __importDefault(require("./routes/admin/judging"));
const manageSubmissions_1 = __importDefault(require("./routes/admin/manageSubmissions"));
const rounds_1 = __importDefault(require("./routes/admin/rounds"));
const schedule_1 = __importDefault(require("./routes/admin/schedule"));
const teamsChoice_1 = __importDefault(require("./routes/admin/teamsChoice"));
const captains_1 = __importDefault(require("./routes/applications/captains"));
const mappers_1 = __importDefault(require("./routes/applications/mappers"));
const voting_1 = __importDefault(require("./routes/applications/voting"));
const judging_2 = __importDefault(require("./routes/judging"));
const results_1 = __importDefault(require("./routes/results"));
const mappersChoice_1 = __importDefault(require("./routes/applications/mappersChoice"));
const submissions_1 = __importDefault(require("./routes/submissions"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/admin/users"));
const users_2 = __importDefault(require("./routes/users"));
const logs_1 = __importDefault(require("./routes/admin/logs"));
const app = new koa_1.default();
app.keys = config_json_1.default.keys;
typeorm_1.createConnection().then(() => {
    console.log('DB initializated');
}).catch((err) => {
    console.log(err);
});
app.use(koa_helmet_1.default());
app.use(koa_session_1.default({ key: 'omwc:sess' }, app));
app.use(koa_static_1.default(path_1.default.join(__dirname, '../public')));
app.use(koa_bodyparser_1.default());
app.use(koa_views_1.default(path_1.default.join(__dirname, '../public')));
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (ctx.originalUrl !== '/favicon.ico') {
            console.log('\x1b[33m%s\x1b[0m', ctx.originalUrl);
        }
        yield next();
        if (ctx.status === 404) {
            yield ctx.render('index');
        }
    }
    catch (err) {
        ctx.status = err.status || 500;
        if (ctx.request.type === 'application/json') {
            ctx.body = { error: 'Something went wrong!' };
        }
        else {
            yield ctx.render('error');
        }
        ctx.app.emit('error', err, ctx);
    }
}));
app.use(routes_1.default.routes());
app.use(routes_1.default.allowedMethods());
app.use(results_1.default.routes());
app.use(results_1.default.allowedMethods());
app.use(teams_1.default.routes());
app.use(teams_1.default.allowedMethods());
app.use(users_2.default.routes());
app.use(users_2.default.allowedMethods());
app.use(captains_1.default.routes());
app.use(captains_1.default.allowedMethods());
app.use(mappers_1.default.routes());
app.use(mappers_1.default.allowedMethods());
app.use(voting_1.default.routes());
app.use(voting_1.default.allowedMethods());
app.use(mappersChoice_1.default.routes());
app.use(mappersChoice_1.default.allowedMethods());
app.use(submissions_1.default.routes());
app.use(submissions_1.default.allowedMethods());
app.use(judging_2.default.routes());
app.use(judging_2.default.allowedMethods());
app.use(users_1.default.routes());
app.use(users_1.default.allowedMethods());
app.use(schedule_1.default.routes());
app.use(schedule_1.default.allowedMethods());
app.use(captainChoice_1.default.routes());
app.use(captainChoice_1.default.allowedMethods());
app.use(teamsChoice_1.default.routes());
app.use(teamsChoice_1.default.allowedMethods());
app.use(rounds_1.default.routes());
app.use(rounds_1.default.allowedMethods());
app.use(manageSubmissions_1.default.routes());
app.use(manageSubmissions_1.default.allowedMethods());
app.use(judging_1.default.routes());
app.use(judging_1.default.allowedMethods());
app.use(logs_1.default.routes());
app.use(logs_1.default.allowedMethods());
app.on('error', (err, ctx) => {
    console.log(err);
});
app.listen(3000);
