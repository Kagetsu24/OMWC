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
const koa_body_1 = __importDefault(require("koa-body"));
const path_1 = __importDefault(require("path"));
const helpers_1 = require("../../helpers");
const authentication_1 = require("../../middlewares/authentication");
const Round_1 = require("../../models/rounds/Round");
const Submission_1 = require("../../models/rounds/Submission");
const downloadSubmission_1 = require("../../middlewares/downloadSubmission");
const baseDir = path_1.default.join(__dirname, '../../../osz/');
const submissionsAdminRouter = new router_1.default();
submissionsAdminRouter.prefix('/api/admin/submissions');
submissionsAdminRouter.use(authentication_1.authenticate);
submissionsAdminRouter.use(authentication_1.isStaff);
submissionsAdminRouter.get('/', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const rounds = yield Round_1.Round.find({
        relations: [
            'matches',
            'matches.submissions',
            'matches.submissions.country',
        ],
    });
    ctx.body = {
        rounds,
    };
}));
submissionsAdminRouter.post('/:id/save', koa_body_1.default({
    multipart: true,
    formidable: {
        multiples: false,
    },
}), (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const anonymisedAs = (_a = ctx.request.body.anonymisedAs) === null || _a === void 0 ? void 0 : _a.trim();
    if (!anonymisedAs) {
        return ctx.body = {
            error: `Type the entry's name`,
        };
    }
    const oszFile = (_b = ctx.request.files) === null || _b === void 0 ? void 0 : _b.oszFile;
    if (!oszFile || !oszFile.name.endsWith('.osz')) {
        return ctx.body = {
            error: 'Select an .osz file',
        };
    }
    const submissionId = helpers_1.convertToIntOrThrow(ctx.params.id);
    const submission = yield Submission_1.Submission.findOneOrFail({
        where: {
            id: submissionId,
        },
        relations: [
            'match',
            'match.round',
        ],
    });
    const finalDir = path_1.default.join(baseDir, submission.match.round.title);
    const fileName = `${anonymisedAs}.osz`;
    const finalPath = path_1.default.join(finalDir, fileName);
    const anonymisedPath = path_1.default.join(submission.match.round.title, fileName);
    if (oszFile) {
        yield helpers_1.saveFile(oszFile.path, finalDir, finalPath);
    }
    yield helpers_1.checkFileExistence(finalPath);
    submission.anonymisedAs = anonymisedAs;
    submission.anonymisedPath = anonymisedPath;
    yield submission.save();
    ctx.body = {
        success: 'ok',
    };
}));
submissionsAdminRouter.get('/:id/download', downloadSubmission_1.findSubmission, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = ctx.state.submission;
    ctx.state.baseDir = baseDir;
    ctx.state.downloadPath = submission.originalPath;
    return yield next();
}), downloadSubmission_1.download);
submissionsAdminRouter.get('/:id/downloadAnom', downloadSubmission_1.findSubmission, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const submission = ctx.state.submission;
    ctx.state.baseDir = baseDir;
    ctx.state.downloadPath = submission.anonymisedPath;
    return yield next();
}), downloadSubmission_1.download);
exports.default = submissionsAdminRouter;
