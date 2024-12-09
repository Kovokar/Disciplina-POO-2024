// Microblog.ts

import { Postagem } from '../Postagem/Postagem';

export class Microblog {
    postagens: Postagem[];

    constructor() {
        this.postagens = [];
    }

    // Método para incluir uma postagem no array de postagens
    incluirPostagem(postagem: Postagem): void {
        this.postagens.push(postagem);
    }

    // Método para excluir uma postagem pelo ID
    excluirPostagem(id: number): void {
        const index = this.postagens.findIndex(postagem => postagem.id === id);
        if (index !== -1) {
            this.postagens.splice(index, 1); // Exclui a postagem
        } else {
            console.log('Postagem não encontrada!');
        }
    }

    // Método que retorna a postagem mais curtida
    postagemMaisCurtida(): Postagem | null {
        if (this.postagens.length === 0) return null;
        return this.postagens.reduce((maisCurtida, postagem) => {
            return postagem.quantidadeCurtidas > maisCurtida.quantidadeCurtidas ? postagem : maisCurtida;
        });
    }

    // Método para curtir uma postagem passando o ID
    curtir(id: number): void {
        const postagem = this.postagens.find(postagem => postagem.id === id);
        if (postagem) {
            postagem.curtir();
        } else {
            console.log('Postagem não encontrada!');
        }
    }

    // Método que retorna o toString de todas as postagens
    toString(): string {
        return this.postagens.map(postagem => postagem.toString()).join('\n');
    }
}
