// index.ts

import { Postagem } from './Postagem/Postagem';
import { Microblog } from './MicroBlog/Microblog';

// Criando um microblog
let meuMicroblog = new Microblog();

// Criando postagens
let postagem1 = new Postagem(1, "Bom dia, pessoal!");
let postagem2 = new Postagem(2, "Aprendendo TypeScript!");
let postagem3 = new Postagem(3, "Amo programar!");

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
let maisCurtida = meuMicroblog.postagemMaisCurtida();
if (maisCurtida) {
    console.log("Postagem mais curtida: " + maisCurtida.toString());
}
