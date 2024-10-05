"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.turso = void 0;
var web_1 = require("@libsql/client/web");
exports.turso = (0, web_1.createClient)({
    url: process.env.ASTRO_DB_REMOTE_URL,
    authToken: process.env.ASTRO_DB_APP_TOKEN,
});
