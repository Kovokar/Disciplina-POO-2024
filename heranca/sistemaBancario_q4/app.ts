import { Cliente } from './Cliente/Cliente'
import { Banco } from './Banco/Banco'
import { Conta } from './Conta/Conta'

import * as promptSync from 'prompt-sync'

const input = promptSync() 
let banco: Banco = new Banco()

perguntar()




function exibirMenuDeOpcoes() {
    let opcao: string

    do {
        exibirMenu()
        opcao = input("Opção: ")

        switch (opcao) {
            case "1":
                console.log("Você escolheu a função 'Inserir Conta'")
                inserirConta()
                break
            case "2":
                console.log("Você escolheu a função 'Consultar Conta'")
                consultarConta()
                break
            case "3":
                console.log("Você escolheu a função 'Sacar'")
                sacar()
                break
            case "4":
                console.log("Você escolheu a função 'Depositar'")
                depositar()
                break
            case "5":
                console.log("Você escolheu a função 'Excluir Conta'")
                excluirConta()
                break
            case "6":
                console.log("Você escolheu a função 'Transferir'")
                transferir()
                break
            case "7":
                console.log("Você escolheu a função 'Totalizações'")
                totalizacoes()
                break
            case "8":
                console.log("Você escolheu a função 'Inserir Cliente'")
                inserirCliente()
                break
            case "9":
                console.log("Você escolheu a função 'Consultar Cliente'")
                consultarCliente()
                break
            case "10":
                console.log("Você escolheu a função 'Associar Conta'")
                associarContaCliente()
                break
            case "11":
                console.log("Você escolheu a função 'Mudar Titularidade da Conta'")
                mudarTitularidadeConta()
                break
            case "12":
                console.log("Você escolheu a função 'Excluir Cliente'")
                excluirCliente()
                break
            case "13":
                console.log("Você escolheu a função 'Listar Contas Sem Cliente'")
                listarContasSemCliente()
                break
            case "0":
                console.log("Aplicação encerrada.")
                break
            default:
                console.log("Opção inválida! Tente novamente.")
        }

        input("Operação finalizada. Pressione <enter> para continuar...")

    } while (opcao !== "0")
}

function inserirConta(ie_automatico?: boolean): void{
    let id_conta = createIdGenerator()

    if (ie_automatico){
        banco.inserirConta(new Conta('111-1', 1000, 1))
        banco.inserirConta(new Conta('222-2', 200, 2))
        banco.inserirConta(new Conta('333-3', 300, 3))
        banco.inserirConta(new Conta('444-4', 400, 4))
        banco.inserirConta(new Conta('555-5', 500, 5)) //conta sem cliendte
        return 
    }

    const num_conta = input("Digite o número da conta: ")
    let saldo = isNumber(Number(input("Digite o saldo da conta: ")))
    const conta1 = new Conta(num_conta, saldo, id_conta()) 

    banco.inserirConta(conta1)

}

function consultarConta(ie_automatico?: boolean): void{
    if (ie_automatico){
        console.log(banco.consultar("111-1"))
        return
    }

    const conta_buscada = input("Digite a conta que deseja buscar: ")
    console.log(banco.consultar(conta_buscada))
}

function sacar(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.sacar("1", "111-1", 50)
        return
    }

    const cpf_cliente = input("Digite seu CPF: ")
    const num_conta = input("Digite o número da conta que deseja sacar: ")
    const saque = isNumber(Number(input("Digite o saque que deseja realizar: ")))

    banco.sacar(cpf_cliente, num_conta, saque)

}

function depositar(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.depositar("1", "111-1", 100)
        return
    }

    const cpf_cliente = input("Digite seu CPF: ")
    const num_conta = input("Digite o número da conta que deseja depositar: ")
    const deposito = isNumber(Number(input("Digite o valor do deposito que deseja realizar: ")))

    banco.depositar(cpf_cliente, num_conta, deposito)

}

function excluirConta(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.removerContaVinculada('3','333-3')
        return
    }

    const cpf_apagar = input("Digite o CPF do dono da conta que deseja apagar: ")
    const num_conta = input("Digite o número da conta que deseja apagar: ") 
    banco.removerContaVinculada(cpf_apagar, num_conta)
}

function transferir(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.trasnferir("1","111-1", "2", "222-2", 100)
        return
    }
    const cpf_remetente = input("Digite o CPF vinculado a conta que irá mandar o dinheiro: ")
    const num_conta_remetente = input("Digite o número da conta que irá mandar o dinheiro: ")
    const cpf_destino = input("Digite o CPF vinculado a conta que irá receber o dinheiro: ")
    const num_conta_destino = input("Digite o número da conta que irá receber o dinheiro: ")
    const val_transferido = isNumber(Number(input("Digite o valor que deseja transferir: ")))

    banco.trasnferir(cpf_remetente, num_conta_remetente, cpf_destino, num_conta_destino, val_transferido

    )
}

function totalizacoes(): void{
    console.log(`Há ${banco.totalDeContas()} contas no banco`)
    console.log(`No total foram depositados R$${banco.data.totDepositado} em todas contas do banco`)
    console.log(`O saldo médio das contas do banco é de R$${banco.saldoMedioContas()}`)
}

function inserirCliente(ie_automatico?: boolean): void{
    let id_cliente = createIdGenerator()

    if (ie_automatico){
        banco.inserirCliente(new Cliente(id_cliente(), "pedro", '1'))
        banco.inserirCliente(new Cliente(id_cliente(), "joao", '2'))
        banco.inserirCliente(new Cliente(id_cliente(), "tevis", '3'))
        banco.inserirCliente(new Cliente(id_cliente(), "maria", '4'))
        banco.inserirCliente(new Cliente(id_cliente(), "cliente_apagado", '5'))

        return
    }

    const nome_cli = input("Digite o nome do cliente: ")
    const cpf_cliente = input("Digite seu CPF: ")
    const cliente = new Cliente(id_cliente(), nome_cli, cpf_cliente) 

    banco.inserirCliente(cliente)
}

function consultarCliente(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.consultaPorCpf('1')
        return
    }

    const cpf_cliente = input("Digite o CPF do cliente que deseja buscar: ")
    banco.consultaPorCpf(cpf_cliente)
}

function associarContaCliente(ie_automatico?: boolean): void{
    if (ie_automatico){
        banco.associarContaCliente('111-1','1')
        banco.associarContaCliente('222-2','2')
        banco.associarContaCliente('333-3','3')
        banco.associarContaCliente('444-4','4')
        return
    }

    const conta = input("Digite o número da conta que deseja associar: ")
    const cpf_cliente = input("Digite o CPF do cliente que deseja associar: ")
    banco.associarContaCliente(conta, cpf_cliente)

}

function mudarTitularidadeConta(ie_automatico?: boolean): void{
    if (ie_automatico){
        console.log("Mudando titularidade da conta '111-1' para Maria...")
        banco.mudarTitularidadeConta("111-1", "4")
        console.log("\nConsultando a conta após a mudança de titularidade...")
        console.log(banco.consultar("111-1"))
        return
    }
    const numeroConta = input("Digite o número da conta que deseja mudar de titular: ")
    const novoCpfCliente = input("Digite o CPF do novo titular: ")
    banco.mudarTitularidadeConta(numeroConta, novoCpfCliente)
}

function excluirCliente(ie_automatico?: boolean): void{
    if (ie_automatico){
        console.log("Excluindo o cliente 'Cliete_apagado'...")
        banco.excluirCliente("5") 
        return
    }

    const cpf_cliente = input("Digite o cpf do cliente que deseja excluir: ")
    banco.excluirCliente(cpf_cliente)
}

function listarContasSemCliente(ie_automatico?: boolean): void{
    const contasSemCliente = banco.listarContasSemCliente()
    console.log("\nContas sem cliente associado:")
    contasSemCliente.forEach(conta => {
        console.log(`Número da Conta: ${conta.numero}, Saldo: R$${conta.saldo}`)
    })
    const numeroConta = input("Digite o número da conta que deseja associar a um cliente: ")
    const cpfCliente = input("Digite o CPF do cliente: ")
    banco.associarContaSemCliente(numeroConta, cpfCliente)
}

function testeAutomatico(){

    console.log()
    inserirConta(true)
    console.log()
    inserirCliente(true)
    console.log()
    associarContaCliente(true)
    console.log()
    // console.log("CONSTAS NO BANCO: ")
    // console.log(banco.contas)
    // console.log()
    // console.log("CLIENTES CADASTRADOS")
    // console.log(banco.clientes)
    // console.log("\n\n")
    console.log("CONSULTANDO CONTA:")
    consultarConta(true)
    console.log()
    sacar(true)
    console.log()
    depositar(true)
    console.log()
    excluirConta(true)
    console.log()
    transferir(true)
    console.log()
    totalizacoes()
    mudarTitularidadeConta(true)
    excluirCliente(true)
    listarContasSemCliente()
}

function perguntar() {

    
    let resposta
        while (true) {
        resposta = input("Você deseja fazer testes automáticos? (sim/não) ")
        if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s" ||resposta.toLowerCase() === "ss") {
            testeAutomatico()
            break
        } else if (resposta.toLowerCase() === "não" || resposta.toLowerCase() === "nao" || resposta.toLowerCase() === "n") {
            exibirMenuDeOpcoes()
            break
        } else {
            console.log("Resposta inválida! Por favor, responda com 'sim' ou 'não'.")
        }
    }
}

function exibirMenu(): void {
    console.log('\nBem-vindo! Selecione uma opção:')
    console.log('Contas:')
    console.log('1 - Inserir')
    console.log('2 - Consultar')
    console.log('3 - Sacar')
    console.log('4 - Depositar')
    console.log('5 - Excluir')
    console.log('6 - Transferir')
    console.log('7 - Totalizações')
    console.log('Clientes:')
    console.log('8 - Inserir Cliente')
    console.log('9 - Consultar Cliente')
    console.log('10 - Associar Conta')
    console.log('0 - Sair')
}

function isNumber(val: number): number {
    while(isNaN(val)){
        console.log("Valor inválido! Por favor, tente novamente.")
        val = Number(input("Digite o saldo da conta: "))
    }
    return val
}

function createIdGenerator() {
    let id = 0

    return function(): number {
        id += 1
        return id
    }
}

