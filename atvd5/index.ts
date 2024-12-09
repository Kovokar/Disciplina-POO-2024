import { Cliente } from './Cliente/Cliente'
import { Banco } from './Banco/Banco'
import { Conta } from './Conta/Conta'

// Inicializando o banco
let banco: Banco = new Banco()

// // Criando clientes
const cliente1 = new Cliente(1, 'João', '1')
const cliente2 = new Cliente(2, 'Maria', '2')
const cliente3 = new Cliente(3, 'Carlos', '3')
const cliTevis = new Cliente(4, 'Tevis', '4')



banco.inserirCliente(cliente1)
banco.inserirCliente(cliente2)
banco.inserirCliente(cliente3)
banco.inserirCliente(cliTevis)
console.log('')
banco.inserirConta(new Conta('111-1', 100, 1))
banco.inserirConta(new Conta('222-2', 200, 2))
banco.inserirConta(new Conta('333-3', 300, 3))
banco.inserirConta(new Conta('444-4', 400, 4))


//TESTANDO REGRAS DE NEGOCIO
console.log('')
banco.associarContaCliente('111-1','4')
banco.associarContaCliente('222-2','4')
banco.associarContaCliente('222-2','1') //deve gerar erro
console.log('')


const cliIdRepetido = new Cliente(4, 'Felipe','5')
const cliCPFRepetido = new Cliente(5, 'teste', '1')

banco.inserirCliente(cliIdRepetido) // deve gerar erro
banco.inserirCliente(cliCPFRepetido) // deve gerar erro
console.log('')

banco.inserirConta(new Conta('555-5', 500, 4)) // deve gerar erro
banco.inserirConta(new Conta('444-4', 500, 5)) // deve gerar erro


console.log(banco.listarContasDeUmCliente('4'))

console.log(banco.totalizadorSaldoCliente('4'))
