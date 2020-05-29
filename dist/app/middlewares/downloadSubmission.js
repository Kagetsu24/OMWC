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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const helpers_1 = require("../helpers");
const Submission_1 = require("../models/rounds/Submission");
function findSubmission(ctx, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = helpers_1.convertToIntOrThrow(ctx.params.id);
        const submission = yield Submission_1.Submission.findOneOrFail({
            where: { id },
            relations: [
                'match',
                'match.round',
            ],
        });
        ctx.state.submission = submission;
        return yield next();
    });
}
exports.findSubmission = findSubmission;
function download(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        const baseDir = ctx.state.baseDir;
        const downloadPath = ctx.state.downloadPath;
        yield helpers_1.checkFileExistence(path_1.default.join(baseDir, downloadPath));
        const s = downloadPath.split('/');
        ctx.attachment(s[s.length - 1]);
        ctx.type = 'application/octet-stream';
        ctx.body = fs_1.default.createReadStream(path_1.default.join(baseDir, downloadPath));
    });
}
exports.download = download;
