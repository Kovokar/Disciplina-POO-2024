// Postagem.ts

export class Postagem {
    id: number;
    texto: string;
    quantidadeCurtidas: number;

    constructor(id: number, texto: string) {
        this.id = id;
        this.texto = texto;
        this.quantidadeCurtidas = 0;
    }

    // Método que incrementa a quantidade de curtidas
    curtir(): void {
        this.quantidadeCurtidas++;
    }

    // Método que retorna a postagem como uma string, incluindo as curtidas
    toString(): string {
        return `${this.texto} - Curtidas: ${this.quantidadeCurtidas}`;
    }
}
