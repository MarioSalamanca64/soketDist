"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosLista = void 0;
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    //agregar un usuario
    agregar(usuario) {
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    actualizarNombre(id, nombre) {
        //almomento de crearlo tenemos que saber que id contienen 
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                //salir de ciclo for 
                break;
            }
        }
        console.log('===== Actualizando usuario ======');
        console.log(this.lista);
    }
    //Obtener lista de ususarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    //obtener solo un usuario
    getUsuario(id) {
        //find devuelve el primer valor dela matris o array
        return this.lista.find(usuario => usuario.id === id);
    }
    //obtener usuarios en una sala en particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => usuario.sala === sala);
    }
    //borrar un usuario o quitar cuando se descoencta de nuestro chat
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => usuario.id !== id);
        //lista de los que estan conectados
        //console.log(this.lista)
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
