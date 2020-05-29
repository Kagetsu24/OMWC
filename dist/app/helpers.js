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
const fs_1 = __importDefault(require("fs"));
function convertToIntOrThrow(input) {
    const parsedInput = parseInt(input, 10);
    if (isNaN(parsedInput)) {
        throw new Error('Not a number');
    }
    return parsedInput;
}
exports.convertToIntOrThrow = convertToIntOrThrow;
function convertToArray(input) {
    if (Array.isArray(input)) {
        return input;
    }
    return [input];
}
exports.convertToArray = convertToArray;
function isUrl(input) {
    if (typeof input !== 'string') {
        return false;
    }
    const pattern = /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return pattern.test(input.trim());
}
exports.isUrl = isUrl;
function isOsuUrl(input) {
    if (!isUrl(input)) {
        return false;
    }
    const url = new URL(input);
    return url.host === 'osu.ppy.sh';
}
exports.isOsuUrl = isOsuUrl;
function checkFileExistence(path) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs_1.default.promises.access(path, fs_1.default.constants.F_OK | fs_1.default.constants.R_OK);
    });
}
exports.checkFileExistence = checkFileExistence;
function saveFile(inputPath, outputDir, outputPath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fs_1.default.promises.mkdir(outputDir, { recursive: true });
            yield fs_1.default.promises.writeFile(outputPath, inputPath);
        }
        catch (error) {
            console.log(error);
            throw new Error(`Couldn't save the file`);
        }
    });
}
exports.saveFile = saveFile;
