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
        if (this.contaJaExiste(conta.id_conta, conta.numero)){
            console.error(`Já existe uma conta com o id ${conta.id_conta} ou um numero de conta ${conta.numero} cadastrado. Não é possível adicionar.`)
        }
        else{
            this.contas.push(conta)
            console.log(`Conta ${conta.numero} cadastrado com sucesso`)
        }
        this.contas.push(conta)
    }

    inserirCliente(cliente: Cliente): void {
        if (this.clienteJaExiste(cliente.id_cliente, cliente.cpf)){
            console.error(`Já existe uma conta com o id ${cliente.id_cliente} ou um cpf ${cliente.cpf} cadastrado. Não é possível adicionar.`)
        }
        else{
            this.clientes.push(cliente)
            console.log(`Cliente ${cliente.nome} cadastrado com sucesso`)
        }
    }

    private clienteJaExiste(id: number, cpf: string): boolean{
        return this.clientes.some(cli => cli.cpf === cpf || cli.id_cliente === id)
    }

    private contaJaExiste(id: number, numeroConta: string): boolean{
        return this.contas.some(conta => conta.numero === numeroConta || conta.id_conta === id)
    }


    consultar(numero: string): Conta | null {
        const contaProcurada = this.contas.filter(conta => conta.numero === numero)
        
        if (!contaProcurada) {
            console.error(`Conta com número ${numero} não encontrada.`)
            return null 
        }
        
        return contaProcurada[0]
    }

    consultaPorCpf(cpf: string): Cliente | null {
        const result = this.clientes.filter((key) => key.cpf === cpf)

        if (!result){
            console.error(`Cliente com CPF ${cpf} não encontrado.`)
            return null
        }
        return result[0]
    }

    associarContaCliente(numeroConta: string, cpfCliente: string): void{
        const cliente = this.consultaPorCpf(cpfCliente)
        const conta = this.consultar(numeroConta)

        if (!cliente || !conta) return
        if (conta.st_assosciada){
            console.error(`A conta ${conta.numero} já está associada a outro cliente.`)
            return
        }
        cliente.contas.push(conta)
        this.mudarStatusConta(conta)
        console.log(`Conta ${numeroConta} associada com sucesso ao cliente ${cliente.nome}.`)
        
    }

    private mudarStatusConta(conta: Conta): void{
        conta.st_assosciada = true
    }

    listarContasDeUmCliente(cpfCliente: string ): Conta[] | undefined {
        const cliente = this.consultaPorCpf(cpfCliente)
        return cliente?.contas
    }

    totalizadorSaldoCliente(cpf: string): number{
        const contasDeCliente = this.listarContasDeUmCliente(cpf)
        let totalizador :number = 0
        contasDeCliente?.forEach(element => {
            totalizador += element.saldo
        })
        return totalizador
    }

    
}
