import { Cliente } from "../Cliente/Cliente"

export class Conta {
    private numero: string;
    private saldo: number;
    private id_conta: number;
    private cliente: Cliente;
    private st_assosciada: boolean; // está associada?

    constructor(numero: string, saldo: number, id_conta: number) {
        this.numero = numero;
        this.saldo = saldo;
        this.id_conta = id_conta;
        this.st_assosciada = false;
    }

    // Métodos Getters
    getNumero(): string {
        return this.numero;
    }

    getSaldo(): number {
        return this.saldo;
    }

    getIdConta(): number {
        return this.id_conta;
    }

    getCliente(): Cliente {
        return this.cliente;
    }

    isAssociada(): boolean {
        return this.st_assosciada;
    }

    // Métodos de ação
    sacar(valor: number): void {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        } else {
            console.log("Saldo insuficiente");
        }
    }

    depositar(valor: number): void {
        this.saldo += valor;
    }

    consultarSaldo(): number {
        return this.saldo;
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    // Setter para alterar o status de associação
    setAssociada(status: boolean): void {
        this.st_assosciada = status;
    }
}
