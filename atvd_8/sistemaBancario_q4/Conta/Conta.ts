import { Cliente } from "../Cliente/Cliente"
import { SaldoInsuficienteError, ValorInvalidoError } from "../AplicacaoError"

export class Conta {
    private _numero: string
    private _saldo: number
    private id_conta: number
    private _cliente: Cliente | null = null
    private st_assosciada: boolean; // está associada?

    constructor(numero: string, saldo: number, id?: number) {
        this._numero = numero
        this.id_conta = id || 0
        this.st_assosciada = false
        this._saldo = 0 
        
        // Usando o método depositar para atribuir o saldo inicial
        this.depositar(saldo)
    }

    // Métodos Getters
    getNumero(): string {
        return this._numero;
    }

    getSaldo(): number {
        return this._saldo;
    }

    getIdConta(): number {
        return this.id_conta;
    }

    getCliente(): Cliente | null {
        return this._cliente;
    }

    isAssociada(): boolean {
        return this.st_assosciada;
    }

    // Métodos de ação
    sacar(valor: number): void {
        this.validaValor(valor, 'saque')
        if (valor > this._saldo) {
            throw new SaldoInsuficienteError(this._saldo, valor)
        }
        this._saldo -= valor
    }

    depositar(valor: number): void {
        this.validaValor(valor, 'depósito')
        this._saldo += valor
    }

    consultarSaldo(): number {
        return this._saldo;
    }

    transferir(contaDestino: Conta, valor: number): void {
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    // Setter para alterar o status de associação
    setAssociada(status: boolean): void {
        this.st_assosciada = status;
    }

    private validaValor(valor: number, operacao: string): void {
        if (isNaN(valor) || valor <= 0) {
            throw new ValorInvalidoError(valor, operacao)
        }
    }
}
