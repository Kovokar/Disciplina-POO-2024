import { Conta } from "../Conta/Conta"

export class Cliente {
    private id_cliente: number;
    private nome: string;
    private cpf: string;
    private dt_nascimento: Date;
    private contas: Conta[];

    getNome(): string {
        return this.nome;
    }

    getCpf(): string {  
        return this.cpf;
    }

    idCliente(): number {
        return this.id_cliente;
    }

    getContas(): Conta[] {
        return this.contas;
    }

    setContas(val: Conta[]): Conta[] {
        return this.contas = val;
    }


    constructor(id_cliente: number, nome: string, cpf: string ){
        this.nome = nome
        this.id_cliente = id_cliente
        this.cpf = cpf
        this.contas = []

    }
}