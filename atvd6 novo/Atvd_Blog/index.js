"use strict";
// index.ts
Object.defineProperty(exports, "__esModule", { value: true });
var Postagem_1 = require("./Postagem/Postagem");
var Microblog_1 = require("./MicroBlog/Microblog");
// Criando um microblog
var meuMicroblog = new Microblog_1.Microblog();
// Criando postagens
var postagem1 = new Postagem_1.Postagem(1, "Bom dia, pessoal!");
var postagem2 = new Postagem_1.Postagem(2, "Aprendendo TypeScript!");
var postagem3 = new Postagem_1.Postagem(3, "Amo programar!");
// Incluindo as postagens no microblog
meuMicroblog.incluirPostagem(postagem1);
meuMicroblog.incluirPostagem(postagem2);
meuMicroblog.incluirPostagem(postagem3);
// Curtindo postagens
meuMicroblog.curtir(1); // Curte a postagem com id 1
meuMicroblog.curtir(2); // Curte a postagem com id 2
meuMicroblog.curtir(2); // Curte novamente a postagem com id 2
// Excluindo uma postagem
meuMicroblog.excluirPostagem(3); // Exclui a postagem com id 3
// Exibindo todas as postagens
console.log(meuMicroblog.toString());
// Exibindo a postagem mais curtida
var maisCurtida = meuMicroblog.postagemMaisCurtida();
if (maisCurtida) {
    console.log("Postagem mais curtida: " + maisCurtida.toString());
}
