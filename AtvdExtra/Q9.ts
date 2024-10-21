/*
Crie uma classe chamada SituacaoFinanceira com os atributos valorCreditos e
valorDebitos. Crie um método chamado calcularSaldo() que retorna/calcula a
diferença entre crédito e débito. Instancie uma classe SituacaoFinanceira, inicialize
os dois atributos e exiba o resultado do método calcularSaldo().
 */




class SituacaoFinanceira {
    valorCreditos: number;
    valorDebitos: number;


    calcularSaldo(): number {
        return this.valorCreditos - this.valorDebitos;
    }
}

// Instanciando a classe
let situacao : SituacaoFinanceira;
situacao = new SituacaoFinanceira();
situacao.valorCreditos = 100;
situacao.valorDebitos = 30;
console.log(situacao.calcularSaldo());

