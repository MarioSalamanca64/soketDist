"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_PORT = void 0;
//es una varioable global
//process.env.port es para crear el puerto automatico cuando lo desplegemos en un servidor
exports.SERVER_PORT = Number(process.env.PORT) || 5000;
