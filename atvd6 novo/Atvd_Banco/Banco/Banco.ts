import {Conta} from '../Conta/Conta'
import {Cliente} from '../Cliente/Cliente'

export class Banco {
    contas: Conta[]
    clientes: Cliente[]

    constructor() {
        this.contas = []
        this.clientes = []
    }

    data = {
        totDepositado: 0,
        saldoMedioContas: 0
    }

    inserirConta(conta: Conta): void{
        if (this.contaJaExiste(conta.id_conta, conta.numero)){
            console.error(`Já existe uma conta com o id ${conta.id_conta} ou um numero de conta ${conta.numero} cadastrado. Não é possível adicionar.`)
        }
        else{
            this.contas.push(conta)
            console.log(`Conta ${conta.numero} cadastrado com sucesso`)
        }
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

    removerConta(cpf: string, numeroConta: string): void {
        const clientesIndex = this.retornarContaCliente(cpf, numeroConta)
        if (!clientesIndex) return
        const [cliente, contaIndex] = clientesIndex
        
        cliente.contas.splice(contaIndex, 1);
        console.log(`Conta ${numeroConta} removida com sucesso do cliente ${cliente.nome}.`);
    }

    sacar(cpf: string, numeroConta: string, valSacado: number, ie_trans?: boolean): boolean{
        const clientesIndex = this.retornarContaCliente(cpf, numeroConta)
        if (!clientesIndex) return false
        const [cliente, contaIndex] = clientesIndex

        let saldoCliente = cliente.contas[contaIndex].saldo
        if (saldoCliente < valSacado){
            console.log("Você não tem saldo o suficiente")
            return false
        }
        cliente.contas[contaIndex].saldo -= valSacado
        if (!ie_trans)
            console.log(`Valor de R$${valSacado} sacado com sucesso`)
        return true
    }

    depositar(cpf: string, numeroConta: string, valDeposito: number, ie_trans?: boolean): boolean{
        const clientesIndex = this.retornarContaCliente(cpf, numeroConta)
        if (!clientesIndex) return false

        const [cliente, contaIndex] = clientesIndex
        cliente.contas[contaIndex].saldo += valDeposito
        this.totDepositado(valDeposito)
        if (!ie_trans)
            console.log("Deposito realizado com sucesso!")
        return true
    }

    trasnferir(cpfRemetente: string, numeroContaRemetente: string, cpfDestino: string, numeroContaDestino: string, valTransferido: number): void{
        const clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente)
        const clientesIndexDestino = this.retornarContaCliente(cpfDestino, numeroContaDestino)
        
        if (!clientesIndexRemetente || !clientesIndexDestino) return
        
        if (this.sacar(cpfRemetente, numeroContaRemetente, valTransferido, true)){
            this.depositar(cpfDestino, numeroContaDestino, valTransferido, true)
            console.log("Valor Transferido com Sucesso")
        }
    }

    retornarContaCliente(cpf: string, numeroConta: string): [Cliente,number] | void{
        const cliente = this.consultaPorCpf(cpf)
        if (!cliente) {
          console.log('Cliente não encontrado!');
          return 
        }
        const contaIndex = cliente.contas.findIndex(conta => conta.numero === numeroConta); 
        if (contaIndex === -1) {
            console.log('Conta não encontrada!');
            return
        }

        return [cliente, contaIndex]
    }

    transferirParaVarios(cpfRemetente: string, numeroContaRemetente: string, contasDestinatarios: { cpfDestino: string, numeroContaDestino: string }[], valTransferido: number): void {
        // Encontra a conta do remetente
        const clientesIndexRemetente = this.retornarContaCliente(cpfRemetente, numeroContaRemetente);
        
        if (!clientesIndexRemetente) {
            console.log('Remetente não encontrado ou conta inválida.');
            return;
        }
        
        const [clienteRemetente, contaIndexRemetente] = clientesIndexRemetente;
    
        // Verifica se o saldo do remetente é suficiente para realizar todas as transferências
        const saldoRemetente = clienteRemetente.contas[contaIndexRemetente].saldo;
        if (saldoRemetente < valTransferido * contasDestinatarios.length) {
            console.log('Saldo insuficiente para transferir para todas as contas.');
            return;
        }
        
        // Itera sobre as contas destinatárias e realiza a transferência
        contasDestinatarios.forEach(({ cpfDestino, numeroContaDestino }) => {
            const clientesIndexDestino = this.retornarContaCliente(cpfDestino, numeroContaDestino);
            
            if (!clientesIndexDestino) {
                console.log(`Conta destino não encontrada para CPF: ${cpfDestino} e número de conta: ${numeroContaDestino}`);
                return;
            }
            
            const [clienteDestino, contaIndexDestino] = clientesIndexDestino;
    
            // Realiza o saque da conta remetente e o depósito na conta destino
            if (this.sacar(cpfRemetente, numeroContaRemetente, valTransferido)) {
                this.depositar(cpfDestino, numeroContaDestino, valTransferido);
                console.log(`Transferência de R$${valTransferido} realizada para a conta de ${cpfDestino}`);
            } else {
                console.log(`Falha ao realizar a transferência para a conta de ${cpfDestino}`);
            }
        });
    }

    totalDeContas():number{
        this.contas = this.contas.filter((value, index, self) =>
            index === self.findIndex((t) => t.id_conta === value.id_conta)
          );
        return this.contas.length;
    }

    totDepositado(valDeposito: number): void{
        this.data.totDepositado += valDeposito
    }

    saldoMedioContas(): number{
        this.contas.forEach(conta => {this.data.saldoMedioContas += conta.saldo})
        this.data.saldoMedioContas = this.data.saldoMedioContas/this.totalDeContas()
        return this.data.saldoMedioContas
    }
    
}
