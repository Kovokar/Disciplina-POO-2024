import {Conta} from '../Conta/Conta'
import {Cliente} from '../Cliente/Cliente'



export class Banco {
    contas: Conta[]
    clientes: Cliente[]

    constructor() {
        this.contas = []
        this.clientes = []
    }

    inserirConta(conta: Conta): void{
        this.contas.push(conta)
    }

    inserirCliente(cliente: Cliente): void{
        this.clientes.push(cliente)
    }

    consultar(numero: string): Conta {
        let contaProcurada!: Conta

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                contaProcurada = conta
                break
            }
        }

        return contaProcurada
    }

    consultaPorCpf(cpf: string): Cliente | null {
        const result = this.clientes.filter((key) => key.cpf === cpf)
        if (result.length > 0){
            return result[0]
        }
        return null
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void{
        const cliente = this.consultaPorCpf(cpfCliente)
        const conta = this.consultar(numeroConta)
        cliente?.contas.push(conta)
    }

    listarContasDeUmCliente(cpfCliente: string ): Conta[] | void{
        const cliente = this.consultaPorCpf(cpfCliente)
        return cliente?.contas
    }

    totalizadorSaldoCliente(cpf: string): number{
        const contasDeCliente = this.listarContasDeUmCliente(cpf)
        let totalizador :number = 0
        contasDeCliente?.forEach(element => {
            totalizador += element.saldo
        });
        return totalizador
    }

    
}
