"use strict";
//instalaciones 
//body-parse
//cors
//express
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//iniciar ts en este proyecto
//tsc --init
//configuracion del archivo tsconfig
//module es6 
//"outDir: "dist/"
//correr nuestro codigo de ts en consola
//tsc -w = poner el modo watch observar 
//en otra terminal misma ruta del proyecto
//nodemon dist/
const server_1 = __importDefault(require("./classes/server"));
const router_1 = __importDefault(require("./routes/router"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const server = server_1.default.instance;
//antes de las rutas bodyparse trasorma el formato para que quede como un objeto lo que sea que me manden siempre regresalo como un objeto de js
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
//trasforme en un json 
server.app.use(body_parser_1.default.json());
// CORS para que acepte las peticiones a nuestro back con figurado para cualquier persona
server.app.use(cors_1.default({ origin: true, credentials: true }));
//rutas de servicios
server.app.use('/', router_1.default);
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
