import { Conta } from "../Conta/Conta"

export class Cliente {
    id_cliente: number
    nome: string
    cpf: string
    dt_nascimento: Date
    contas: Conta[]

    constructor(id_cliente: number, nome: string, cpf: string ){
        this.nome = nome
        this.id_cliente = id_cliente
        this.cpf = cpf
        this.contas = []

    }
}