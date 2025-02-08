import { Conta } from "../Conta/Conta"
import { 
    CPFInvalidoError, 
    DataNascimentoInvalidaError, 
    ContaJaAssociadaError 
} from '../AplicacaoError'

export class Cliente {
    private _id: number
    private _nome: string
    private _cpf: string
    private _dataNascimento: Date
    private _contas: Conta[] = []

    constructor(id: number, nome: string, cpf: string, dataNascimento: Date) {
        this.validarCPF(cpf)
        this.validarDataNascimento(dataNascimento)
        
        this._id = id
        this._nome = nome
        this._cpf = cpf
        this._dataNascimento = dataNascimento
    }

    // Métodos Getters
    getIdCliente(): number {
        return this._id;
    }

    getNome(): string {
        return this._nome;
    }

    getCpf(): string {
        return this._cpf;
    }

    getDtNascimento(): Date {
        return this._dataNascimento;
    }

    getContas(): Conta[] {
        return this._contas;
    }

    // Adicionar uma conta ao cliente
    adicionarConta(conta: Conta): void {
        // Verificar se a conta já está associada a outro cliente
        if (conta.isAssociada()) {
            const clienteAtual = conta.getCliente()
            if (clienteAtual && clienteAtual.getCpf() !== this._cpf) {
                throw new ContaJaAssociadaError(
                    conta.getNumero(), 
                    clienteAtual.getCpf(), 
                    this._cpf
                )
            }
        }

        this._contas.push(conta)
        conta.setAssociada(true)
    }

    // Remover uma conta do cliente
    removerConta(conta: Conta): void {
        const index = this._contas.indexOf(conta);
        if (index !== -1) {
            this._contas.splice(index, 1);
        }
    }

    private validarCPF(cpf: string): void {
        // Validação simples de CPF (apenas formato)
        const cpfLimpo = cpf.replace(/[^\d]/g, '')
        
        if (cpfLimpo.length !== 11 || !/^\d+$/.test(cpfLimpo)) {
            throw new CPFInvalidoError(cpf)
        }
    }

    private validarDataNascimento(dataNascimento: Date): void {
        const dataAtual = new Date()
        const idadeMinima = new Date(dataAtual.getFullYear() - 120, 0, 1)
        const idadeMaxima = new Date(dataAtual.getFullYear() - 18, 0, 1)

        if (
            dataNascimento > dataAtual || // Data no futuro
            dataNascimento < idadeMinima || // Muito antiga
            dataNascimento > idadeMaxima // Menor de 18 anos
        ) {
            throw new DataNascimentoInvalidaError(dataNascimento)
        }
    }
}
