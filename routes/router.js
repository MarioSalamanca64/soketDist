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
exports.router = void 0;
const express_1 = require("express");
const server_1 = __importDefault(require("../classes/server"));
const socket_1 = require("../sockets/socket");
//resquest es lo que le pides al servidor 
//la response es lo que te manda 
//creacion de rutas api
//router es lo que ocuparemos para crear nuestras api endpoins o nuestro rest
exports.router = express_1.Router();
//en la segunda parte ese el hander que resive una funcion
exports.router.get('/mensajes', (req, res) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});
exports.router.post('/mensajes', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const payload = {
        cuerpo,
        de
    };
    const server = server_1.default.instance;
    server.io.emit('mensaje-nuevo', payload);
    res.json({
        ok: true,
        cuerpo,
        de,
    });
});
exports.router.post('/mensajes/:id', (req, res) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;
    //payload mensaje que se en viara auna sola persona 
    const payload = {
        de,
        cuerpo
    };
    //servisio rest ya que solo mandaremos mensajes a una sola perona o privado
    const server = server_1.default.instance;
    //in solo para madar el menmsaje auna persona en particular
    server.io.in(id).emit('mensajes-privado', payload);
    //mandar a todo el mundo
    //server.io.emit('mensajes-privado',payload);
    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});
//Servicio para obtener todos los IDs de los usuarios 
exports.router.get('/usuarios', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //nueva instacia de nuestro servidor
    const server = server_1.default.instance;
    yield server.io.fetchSockets().then((sockets) => {
        res.json({
            ok: true,
            // clientes
            clientes: sockets.map(cliente => cliente.id)
        });
    }).catch((err) => {
        res.json({
            ok: false,
            err
        });
    });
}));
//obtener usuarios y sus nombres
exports.router.get('/usuarios/detalle', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        ok: false,
        clientes: socket_1.usuariosConectados.getLista()
    });
}));
exports.default = exports.router;
