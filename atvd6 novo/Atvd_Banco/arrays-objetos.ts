
class Conta {
    numero: string;
    saldo: number;

    constructor(numero: string, saldo: number) {
        this.numero = numero;
        this.saldo = saldo;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    consultarSaldo(): number {
        return this.saldo
    }

    transferir(contaDestino: Conta, valor: number): void {
        // this.saldo = this.saldo - valor;
        // contaDestino.saldo = contaDestino.saldo + valor;

        this.sacar(valor);
        contaDestino.depositar(valor);
    }
}

class Banco {
    contas: Conta[];

    constructor() {
        this.contas = [];
    }

    inserir(conta: Conta) {
        this.contas.push(conta);
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta;

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }

        return contaProcurada;
    }

    consultarPorIndice(numero: string): number {
        let indiceProcurado: number = -1;

        for (let i = 0; i < this.contas.length; i++) {
            if (this.contas[i].numero == numero) {
                indiceProcurado = i;
                break;
            }
        }

        return indiceProcurado;
    }

    excluir(numero: string): void {
        let indiceProcurado: number =
            this.consultarPorIndice(numero);

        if (indiceProcurado != -1) {
            for (let i = indiceProcurado; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta = this.consultar(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    alterar(conta: Conta): void {
        let contaProcurada: Conta = this.consultar(conta.numero);

        if (contaProcurada) {
            contaProcurada = conta;
        }
    }
}


let banco: Banco = new Banco();


banco.inserir(new Conta('111-1', 100));
banco.inserir(new Conta('222-2', 200));
banco.inserir(new Conta('333-3', 300));
banco.inserir(new Conta('444-4', 400));

/*
banco.excluir('444-4');
console.log(banco.contas);
banco.excluir('111-1');
console.log(banco.contas);
banco.excluir('555-5');
console.log(banco.contas);
*/

banco.depositar('444-4', 40);
console.log(banco.consultar('444-4').consultarSaldo());

let conta4Alterada: Conta = new Conta('444-4', 10000);
banco.alterar(conta4Alterada);
console.log(banco.consultar('444-4').consultarSaldo());
