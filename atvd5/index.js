"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente_1 = require("./Cliente/Cliente");
var Banco_1 = require("./Banco/Banco");
var Conta_1 = require("./Conta/Conta");
// Inicializando o banco
var banco = new Banco_1.Banco();
// Criando clientes
var cliente1 = new Cliente_1.Cliente(1, 'João', '1');
var cliente2 = new Cliente_1.Cliente(2, 'Maria', '2');
var cliente3 = new Cliente_1.Cliente(3, 'Carlos', '3');
// Inserindo clientes no banco
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
banco.inserirCliente(cliente3);
banco.inserirCliente(cliente1);
// console.log(banco.clientes)
banco.inserirConta(new Conta_1.Conta('111-1', 100, 1));
banco.inserirConta(new Conta_1.Conta('222-2', 200, 2));
banco.inserirConta(new Conta_1.Conta('333-3', 300, 3));
banco.inserirConta(new Conta_1.Conta('444-4', 400, 4));
// Consultando e exibindo os clientes inseridos
// console.log(banco.consultaPorCpf('1')); // Deve retornar João
// console.log(banco.consultaPorCpf('2')); // Deve retornar Maria
// console.log(banco.consultaPorCpf('3')); // Deve retornar Carlos
// banco.associarContaCliente('111-1', '2')
// banco.associarContaCliente('222-2', '2')
console.log(banco.totalizadorSaldoCliente('2'));
