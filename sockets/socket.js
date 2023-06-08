"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUsuariosActivos = exports.configurarUsuario = exports.mensaje = exports.deconectar = exports.conectarCliente = exports.usuariosConectados = void 0;
const usuarios_lista_1 = require("../classes/usuarios-lista");
const usuario_1 = require("../classes/usuario");
//configurar usuarios //instancias es todo que ya tenemos solo que la ediatemos a qui
exports.usuariosConectados = new usuarios_lista_1.UsuariosLista();
const conectarCliente = (cliente, io) => {
    const usuario = new usuario_1.Usuario(cliente.id);
    exports.usuariosConectados.agregar(usuario);
};
exports.conectarCliente = conectarCliente;
const deconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');
        exports.usuariosConectados.borrarUsuario(cliente.id);
        //cuando se desconecta alguna persona de nuestro chat  // camvios en sever ya que se agrego el io
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.deconectar = deconectar;
//escuchar mensajes del front
const mensaje = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        //para que escuchen todos los que estan conectados
        //mensaje-nuevo debe ser el mismo que en el front
        io.emit('mensaje-nuevo', payload);
    });
};
exports.mensaje = mensaje;
// Configurar usuario para mostrar el nombre
const configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.actualizarNombre(cliente.id, payload.nombre);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        });
    });
};
exports.configurarUsuario = configurarUsuario;
//Obtener Usuarios //io es para emitirlo
const obtenerUsuariosActivos = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        //to espara que solo se lo mande al cliente con id y no a todos es para
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
exports.obtenerUsuariosActivos = obtenerUsuariosActivos;
