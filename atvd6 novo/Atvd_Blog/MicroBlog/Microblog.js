"use strict";
// Microblog.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.Microblog = void 0;
var Microblog = /** @class */ (function () {
    function Microblog() {
        this.postagens = [];
    }
    // Método para incluir uma postagem no array de postagens
    Microblog.prototype.incluirPostagem = function (postagem) {
        this.postagens.push(postagem);
    };
    // Método para excluir uma postagem pelo ID
    Microblog.prototype.excluirPostagem = function (id) {
        var index = this.postagens.findIndex(function (postagem) { return postagem.id === id; });
        if (index !== -1) {
            this.postagens.splice(index, 1); // Exclui a postagem
        }
        else {
            console.log('Postagem não encontrada!');
        }
    };
    // Método que retorna a postagem mais curtida
    Microblog.prototype.postagemMaisCurtida = function () {
        if (this.postagens.length === 0)
            return null;
        return this.postagens.reduce(function (maisCurtida, postagem) {
            return postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida;
        });
    };
    // Método para curtir uma postagem passando o ID
    Microblog.prototype.curtir = function (id) {
        var postagem = this.postagens.find(function (postagem) { return postagem.id === id; });
        if (postagem) {
            postagem.curtir();
        }
        else {
            console.log('Postagem não encontrada!');
        }
    };
    // Método que retorna o toString de todas as postagens
    Microblog.prototype.toString = function () {
        return this.postagens.map(function (postagem) { return postagem.toString(); }).join('\n');
    };
    return Microblog;
}());
exports.Microblog = Microblog;
