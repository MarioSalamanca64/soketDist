"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const environment_1 = require("../global/environment");
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const socket = __importStar(require("../sockets/socket"));
class Server {
    //se usa private porque no queremos que se duplique el io o los sokets 
    constructor() {
        this.app = express_1.default();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1.default.Server(this.app);
        //io es el servidor que personas estan conectadas
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: true, credentials: true } });
        this.escucharSockets();
    }
    //cuando quieran usar la instacia del metodo server se retornara aqui
    static get instance() {
        //si  existe si no existe una instacia  si no que regrese un new server osea una nueva 
        return this._intance || (this._intance = new this());
    }
    escucharSockets() {
        console.log('Escuchando coneciones - sockets');
        //on que esta conectado
        this.io.on('connection', cliente => {
            //console.log('Cliente conectado');
            //id del socket
            //console.log(cliente.id)
            //conectar cliente   
            socket.conectarCliente(cliente, this.io);
            //Configurar usuario
            socket.configurarUsuario(cliente, this.io);
            //obtener usuarios activos
            socket.obtenerUsuariosActivos(cliente, this.io);
            //Mensajes
            socket.mensaje(cliente, this.io);
            //desconectar    
            socket.deconectar(cliente, this.io);
        });
    }
    start(callback) {
        //con eso le desimos que comiense el servidor 
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
