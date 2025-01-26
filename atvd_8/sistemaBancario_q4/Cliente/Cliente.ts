import { Conta } from "../Conta/Conta"

export class Cliente {
    private id_cliente: number;
    private nome: string;
    private cpf: string;
    private dt_nascimento: Date;
    private contas: Conta[];

    constructor(id_cliente: number, nome: string, cpf: string) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.cpf = cpf;
        this.contas = [];
    }

    // Métodos Getters
    getIdCliente(): number {
        return this.id_cliente;
    }

    getNome(): string {
        return this.nome;
    }

    getCpf(): string {
        return this.cpf;
    }

    getDtNascimento(): Date {
        return this.dt_nascimento;
    }

    getContas(): Conta[] {
        return this.contas;
    }

    // Adicionar uma conta ao cliente
    adicionarConta(conta: Conta): void {
        this.contas.push(conta);
    }

    // Remover uma conta do cliente
    removerConta(conta: Conta): void {
        const index = this.contas.indexOf(conta);
        if (index !== -1) {
            this.contas.splice(index, 1);
        }
    }
}
