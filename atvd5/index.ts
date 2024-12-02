import { Cliente } from './Cliente/Cliente';
import { Banco } from './Banco/Banco';
import { Conta } from './Conta/Conta';

// Inicializando o banco
let banco: Banco = new Banco();

// Criando clientes
const cliente1 = new Cliente(1, 'João', '1');
const cliente2 = new Cliente(2, 'Maria', '2');
const cliente3 = new Cliente(3, 'Carlos', '3');

// Inserindo clientes no banco
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
banco.inserirCliente(cliente3);
banco.inserirCliente(cliente1);
// console.log(banco.clientes)



banco.inserirConta(new Conta('111-1', 100, 1));
banco.inserirConta(new Conta('222-2', 200, 2));
banco.inserirConta(new Conta('333-3', 300, 3));
banco.inserirConta(new Conta('444-4', 400, 4));

// Consultando e exibindo os clientes inseridos
// console.log(banco.consultaPorCpf('1')); // Deve retornar João
// console.log(banco.consultaPorCpf('2')); // Deve retornar Maria
// console.log(banco.consultaPorCpf('3')); // Deve retornar Carlos

// banco.associarContaCliente('111-1', '2')
// banco.associarContaCliente('222-2', '2')

console.log(banco.totalizadorSaldoCliente('2'))