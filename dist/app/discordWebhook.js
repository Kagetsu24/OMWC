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
const config_json_1 = __importDefault(require("../config.json"));
const axios_1 = __importDefault(require("axios"));
function webhookPost(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = `https://discordapp.com/api/webhooks/${config_json_1.default.discord.id}/${config_json_1.default.discord.token}`;
        try {
            yield axios_1.default.post(url, {
                embeds: message,
            });
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.webhookPost = webhookPost;
