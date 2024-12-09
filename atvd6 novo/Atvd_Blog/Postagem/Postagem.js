"use strict";
// Postagem.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Postagem = void 0;
var Postagem = /** @class */ (function () {
    function Postagem(id, texto) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = 0;
    }
    // Método que incrementa a quantidade de curtidas
    Postagem.prototype.curtir = function () {
        this.quantidadeCurtidas++;
    };
    // Método que retorna a postagem como uma string, incluindo as curtidas
    Postagem.prototype.toString = function () {
        return "".concat(this.texto, " - Curtidas: ").concat(this.quantidadeCurtidas);
    };
    return Postagem;
}());
exports.Postagem = Postagem;
