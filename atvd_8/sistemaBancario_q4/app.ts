import { Cliente } from './Cliente/Cliente'
import { Banco } from './Banco/Banco'
import { Conta } from './Conta/Conta'
import { Poupanca } from './ContaPoupança/Poupanca'
import * as promptSync from 'prompt-sync'
import { ContaInexistenteError, ClienteNaoEncontradoError, SaldoInsuficienteError, EntradaVaziaError, EntradaInvalidaError, NumeroContaInvalidoError, ValorInvalidoError } from './AplicacaoError'

class App {
    private banco: Banco
    private input: any

    constructor() {
        this.banco = new Banco()
        this.input = promptSync()
        this.iniciar()
    }

    private iniciar() {
        let resposta = this.input("Você deseja fazer testes automáticos? (sim/não) ")
        
        if (resposta.toLowerCase() === "sim" || resposta.toLowerCase() === "s") {
            this.testeAutomatico()
        } else if (resposta.toLowerCase() === "não" || resposta.toLowerCase() === "nao" || resposta.toLowerCase() === "n") {
            this.exibirMenuDeOpcoes()
        } else {
            console.log("Resposta inválida! Por favor, responda com 'sim' ou 'não'.")
            this.iniciar()
        }
    }

    private exibirMenuDeOpcoes() {
        let opcao: string

        do {
            this.exibirMenu()
            opcao = this.input("Opção: ")

            try {
                switch (opcao) {
                    case "1":
                        console.log("Você escolheu a função 'Inserir Conta'")
                        this.inserirConta()
                        break
                    case "2":
                        console.log("Você escolheu a função 'Consultar Conta'")
                        this.consultarConta()
                        break
                    case "3":
                        console.log("Você escolheu a função 'Sacar'")
                        this.sacar()
                        break
                    case "4":
                        console.log("Você escolheu a função 'Depositar'")
                        this.depositar()
                        break
                    case "5":
                        console.log("Você escolheu a função 'Excluir Conta'")
                        this.excluirConta()
                        break
                    case "6":
                        console.log("Você escolheu a função 'Transferir'")
                        this.transferir()
                        break
                    case "7":
                        console.log("Você escolheu a função 'Totalizações'")
                        this.totalizacoes()
                        break
                    case "8":
                        console.log("Você escolheu a função 'Inserir Cliente'")
                        this.inserirCliente()
                        break
                    case "9":
                        console.log("Você escolheu a função 'Consultar Cliente'")
                        this.consultarCliente()
                        break
                    case "10":
                        console.log("Você escolheu a função 'Associar Conta'")
                        this.associarContaCliente()
                        break
                    case "11":
                        console.log("Você escolheu a função 'Mudar Titularidade da Conta'")
                        this.mudarTitularidadeConta()
                        break
                    case "12":
                        console.log("Você escolheu a função 'Excluir Cliente'")
                        this.excluirCliente()
                        break
                    case "13":
                        console.log("Você escolheu a função 'Listar Contas Sem Cliente'")
                        this.listarContasSemCliente()
                        break
                    case "14":
                        console.log("Você escolheu a função 'Render Juros'")
                        this.renderJuros()
                        break
                    case "0":
                        console.log("Aplicação encerrada.")
                        break
                    default:
                        console.log("Opção inválida! Tente novamente.")
                }
            } catch (error) {
                if (error instanceof ContaInexistenteError) {
                    console.error(`Erro de Conta: ${error.message}`)
                } else if (error instanceof ClienteNaoEncontradoError) {
                    console.error(`Erro de Cliente: ${error.message}`)
                } else if (error instanceof SaldoInsuficienteError) {
                    console.error(`Erro Financeiro: ${error.message}`)
                } else {
                    console.error(`Erro inesperado: ${error.message}`)
                }
            }

            this.input("Operação finalizada. Pressione <enter> para continuar...")

        } while (opcao !== "0")
    }

    private inserirConta(ie_automatico?: boolean): void{
        let id_conta = this.createIdGenerator()

        if (ie_automatico){
            this.banco.inserirConta(new Conta('111-1', 1000, 1))
            this.banco.inserirConta(new Conta('222-2', 200, 2))
            this.banco.inserirConta(new Conta('333-3', 300, 3))
            this.banco.inserirConta(new Poupanca('111-1', 1000, 1, 5))
            this.banco.inserirConta(new Poupanca('222-2', 200, 2, 7)) //conta sem cliendte
            return 
        }

        try {
            const num_conta = this.validarNumeroConta(
                this.input("Digite o número da conta (formato XXX-X): ")
            )
            
            const saldo = this.validarNumero(
                this.input("Digite o saldo da conta: "), 
                'saldo'
            )
            
            const conta1 = new Conta(num_conta, saldo, id_conta()) 
            this.banco.inserirConta(conta1)
        } catch (error) {
            console.error(`Erro ao inserir conta: ${error.message}`)
        }
    }

    private consultarConta(ie_automatico?: boolean): void{
        if (ie_automatico){
            console.log(this.banco.consultar("111-1"))
            return
        }

        const conta_buscada = this.input("Digite a conta que deseja buscar: ")
        console.log(this.banco.consultar(conta_buscada))
    }

    private sacar(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.sacar("1", "111-1", 50)
            return
        }

        const cpf_cliente = this.input("Digite seu CPF: ")
        const num_conta = this.input("Digite o número da conta que deseja sacar: ")
        const saque = this.isNumber(Number(this.input("Digite o saque que deseja realizar: ")))

        this.banco.sacar(cpf_cliente, num_conta, saque)
    }

    private depositar(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.depositar("1", "111-1", 100)
            return
        }

        const cpf_cliente = this.input("Digite seu CPF: ")
        const num_conta = this.input("Digite o número da conta que deseja depositar: ")
        const deposito = this.isNumber(Number(this.input("Digite o valor do deposito que deseja realizar: ")))

        this.banco.depositar(cpf_cliente, num_conta, deposito)
    }

    private excluirConta(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.removerContaVinculada('3','333-3')
            return
        }

        const cpf_apagar = this.input("Digite o CPF do dono da conta que deseja apagar: ")
        const num_conta = this.input("Digite o número da conta que deseja apagar: ") 
        this.banco.removerContaVinculada(cpf_apagar, num_conta)
    }

    private transferir(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.transferir("1","111-1", "2", "222-2", 100)
            return
        }
        const cpf_remetente = this.input("Digite o CPF vinculado a conta que irá mandar o dinheiro: ")
        const num_conta_remetente = this.input("Digite o número da conta que irá mandar o dinheiro: ")
        const cpf_destino = this.input("Digite o CPF vinculado a conta que irá receber o dinheiro: ")
        const num_conta_destino = this.input("Digite o número da conta que irá receber o dinheiro: ")
        const val_transferido = this.validaValor(Number(this.input("Digite o valor que deseja transferir: ")))

        this.banco.transferir(cpf_remetente, num_conta_remetente, cpf_destino, num_conta_destino, val_transferido)
    }

    private totalizacoes(): void{
        console.log(`Há ${this.banco.totalDeContas()} contas no banco`)
        console.log(`No total foram depositados R$${this.banco.data.totDepositado} em todas contas do banco`)
        console.log(`O saldo médio das contas do banco é de R$${this.banco.saldoMedioContas()}`)
    }

    private inserirCliente(ie_automatico?: boolean): void{
        let id_cliente = this.createIdGenerator()

        if (ie_automatico){
            this.banco.inserirCliente(new Cliente(id_cliente(), "pedro", '1', new Date()))
            this.banco.inserirCliente(new Cliente(id_cliente(), "joao", '2', new Date()))
            this.banco.inserirCliente(new Cliente(id_cliente(), "tevis", '3', new Date()))
            this.banco.inserirCliente(new Cliente(id_cliente(), "maria", '4', new Date()))
            this.banco.inserirCliente(new Cliente(id_cliente(), "cliente_apagado", '5', new Date()))

            return
        }

        try {
            const nome_cli = this.validarEntradaTexto(
                this.input("Digite o nome do cliente: "), 
                'nome'
            )
            
            const cpf_cliente = this.validarEntradaTexto(
                this.input("Digite seu CPF: "), 
                'CPF'
            )
            
            const data_nascimento = this.validarDataNascimento(
                this.input("Digite sua data de nascimento (AAAA-MM-DD): ")
            )
            
            const cliente = new Cliente(
                id_cliente(), 
                nome_cli, 
                cpf_cliente, 
                data_nascimento
            ) 

            this.banco.inserirCliente(cliente)
        } catch (error) {
            console.error(`Erro ao inserir cliente: ${error.message}`)
        }
    }

    private consultarCliente(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.consultaPorCpf('1')
            return
        }

        const cpf_cliente = this.input("Digite o CPF do cliente que deseja buscar: ")
        this.banco.consultaPorCpf(cpf_cliente)
    }

    private associarContaCliente(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.associarContaCliente('111-1','1')
            this.banco.associarContaCliente('222-2','2')
            this.banco.associarContaCliente('333-3','3')
            this.banco.associarContaCliente('444-4','4')
            return
        }

        const conta = this.input("Digite o número da conta que deseja associar: ")
        const cpf_cliente = this.input("Digite o CPF do cliente que deseja associar: ")
        this.banco.associarContaCliente(conta, cpf_cliente)
    }

    private mudarTitularidadeConta(ie_automatico?: boolean): void{
        if (ie_automatico){
            console.log("Mudando titularidade da conta '111-1' para Maria...")
            this.banco.mudarTitularidadeConta("111-1", "4")
            console.log("\nConsultando a conta após a mudança de titularidade...")
            console.log(this.banco.consultar("111-1"))
            return
        }
        const numeroConta = this.input("Digite o número da conta que deseja mudar de titular: ")
        const novoCpfCliente = this.input("Digite o CPF do novo titular: ")
        this.banco.mudarTitularidadeConta(numeroConta, novoCpfCliente)
    }

    private excluirCliente(ie_automatico?: boolean): void{
        if (ie_automatico){
            console.log("Excluindo o cliente 'Cliete_apagado'...")
            this.banco.excluirCliente("5") 
            return
        }

        const cpf_cliente = this.input("Digite o cpf do cliente que deseja excluir: ")
        this.banco.excluirCliente(cpf_cliente)
    }

    private listarContasSemCliente(ie_automatico?: boolean): void{
        const contasSemCliente = this.banco.listarContasSemCliente()
        console.log("\nContas sem cliente associado:")
        contasSemCliente.forEach(conta => {
            console.log(`Número da Conta: ${conta.getNumero()}, Saldo: R$${conta.getSaldo()}`)
        })
        const numeroConta = this.input("Digite o número da conta que deseja associar a um cliente: ")
        const cpfCliente = this.input("Digite o CPF do cliente: ")
        this.banco.associarContaSemCliente(numeroConta, cpfCliente)
    }

    private renderJuros(ie_automatico?: boolean): void{
        if (ie_automatico){
            this.banco.renderJuros('111-1')
            this.banco.renderJuros('333-3')
            return
        }
        const num_conta = this.input("Digite o número da conta que deseja depositar: ")
        this.banco.renderJuros(num_conta)
    }

    private testeAutomatico() {
        console.log("===== INÍCIO DOS TESTES AUTOMÁTICOS =====")

        try {
            // Teste 1: Criação de Clientes
            console.log("\n--- Teste 1: Criação de Clientes ---")
            const cliente1 = new Cliente(1, "João Silva", "12345678901", new Date(1990, 5, 15))
            const cliente2 = new Cliente(2, "Maria Souza", "98765432109", new Date(1985, 2, 20))
            this.banco.inserirCliente(cliente1)
            this.banco.inserirCliente(cliente2)
            console.log("Clientes criados com sucesso!")

            // Teste 2: Criação de Contas
            console.log("\n--- Teste 2: Criação de Contas ---")
            const conta1 = new Conta('111-1', 1000, 1)
            const conta2 = new Conta('222-2', 500, 2)
            let contaPoupanca = new Poupanca('333-3', 2000, 3, 5)
            this.banco.inserirConta(conta1)
            this.banco.inserirConta(conta2)
            this.banco.inserirConta(contaPoupanca)
            console.log("Contas criadas com sucesso!")

            // Teste 3: Associação de Contas a Clientes
            console.log("\n--- Teste 3: Associação de Contas a Clientes ---")
            this.banco.associarContaCliente('111-1', '12345678901')
            this.banco.associarContaCliente('222-2', '98765432109')
            this.banco.associarContaCliente('333-3', '12345678901')
            console.log("Contas associadas com sucesso!")

            // Teste 4: Operações Bancárias
            console.log("\n--- Teste 4: Operações Bancárias ---")
            
            // Saque
            console.log("Realizando saque...")
            this.banco.sacar('12345678901', '111-1', 200)
            
            // Depósito
            console.log("Realizando depósito...")
            this.banco.depositar('98765432109', '222-2', 300)
            
            // Transferência
            console.log("Realizando transferência...")
            this.banco.transferir('12345678901', '111-1', '98765432109', '222-2', 100)

            // Teste 5: Render Juros em Poupança
            console.log("\n--- Teste 5: Render Juros ---")
            contaPoupanca = new Poupanca('444-4', 1000, 4, 5) // Criar nova conta poupança com valores definidos
            this.banco.inserirConta(contaPoupanca)
            console.log("Saldo antes de render juros: " + contaPoupanca.getSaldo())
            this.banco.renderJuros('444-4')
            const contaAposJuros = this.banco.consultar('444-4')
            console.log("Saldo após render juros: " + contaAposJuros.getSaldo())

            // Teste 6: Tentativa de Transferência com Saldo Insuficiente
            console.log("\n--- Teste 6: Transferência com Saldo Insuficiente ---")
            try {
                this.banco.transferir('12345678901', '111-1', '98765432109', '222-2', 2000)
            } catch (error) {
                console.log("Erro capturado com sucesso: " + error.message)
            }

            // Teste 7: Totalizações
            console.log("\n--- Teste 7: Totalizações ---")
            console.log("Total de Contas: " + this.banco.totalDeContas())
            console.log("Total Depositado: R$" + this.banco.data.totDepositado)
            console.log("Saldo Médio: R$" + this.banco.saldoMedioContas())

            console.log("\n===== TESTES AUTOMÁTICOS CONCLUÍDOS COM SUCESSO =====")

        } catch (error) {
            console.error("Erro durante os testes automáticos:", error)
        }
    }

    private exibirMenu(): void {
        console.log('\nBem-vindo! Selecione uma opção:')
        console.log('Contas:')
        console.log('1 - Inserir')
        console.log('2 - Consultar')
        console.log('3 - Sacar')
        console.log('4 - Depositar')
        console.log('5 - Excluir')
        console.log('6 - Transferir')
        console.log('7 - Totalizações')
        console.log('8 - Inserir Cliente')
        console.log('9 - Consultar Cliente')
        console.log('10 - Associar Conta')
        console.log('11 - Mudar Titularidade')
        console.log('12 - Excluir Cliente')
        console.log('13 - Listar Contas Sem Cliente')
        console.log('14 - Render Juros')
        console.log('0 - Sair')
    }

    private isNumber(val: number): number {
        while(isNaN(val)){
            console.log("Valor inválido! Por favor, tente novamente.")
            val = Number(this.input("Digite o saldo da conta: "))
        }
        return val
    }

    private createIdGenerator() {
        let id = 0

        return function(): number {
            id += 1
            return id
        }
    }

    private validaValor(valor: number): number {
        if (isNaN(valor) || valor <= 0) {
            throw new Error('Valor inválido. O valor deve ser um número positivo.')
        }
        return valor
    }

    private validarEntradaTexto(valor: string, nomeCampo: string): string {
        if (!valor || valor.trim() === '') {
            throw new EntradaVaziaError(nomeCampo)
        }
        return valor.trim()
    }

    private validarNumero(valor: string | number, nomeCampo: string): number {
        const valorConvertido = typeof valor === 'string' 
            ? valor.trim().replace(',', '.')  // Tratar vírgulas
            : valor

        const numero = Number(valorConvertido)

        if (isNaN(numero)) {
            throw new EntradaInvalidaError(nomeCampo, 'Valor não é um número válido.')
        }

        if (numero < 0) {  // Alterado de <= 0 para < 0 para permitir saldo zero
            throw new ValorInvalidoError(numero, nomeCampo)
        }

        return numero
    }

    private validarNumeroConta(numeroConta: string): string {
        // Regex para formato XXX-X
        const regex = /^\d{3}-\d{1}$/

        if (!regex.test(numeroConta)) {
            throw new NumeroContaInvalidoError(numeroConta)
        }

        return numeroConta
    }

    private validarDataNascimento(dataString: string): Date {
        try {
            const data = new Date(dataString)
            
            if (isNaN(data.getTime())) {
                throw new EntradaInvalidaError('data de nascimento', 'Formato de data inválido.')
            }

            // Validações adicionais podem ser feitas aqui ou na classe Cliente
            return data
        } catch (error) {
            throw new EntradaInvalidaError('data de nascimento')
        }
    }
}

// Iniciar a aplicação
new App()

