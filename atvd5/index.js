"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente_1 = require("./Cliente/Cliente");
var Banco_1 = require("./Banco/Banco");
var Conta_1 = require("./Conta/Conta");
// Inicializando o banco
var banco = new Banco_1.Banco();
// // Criando clientes
var cliente1 = new Cliente_1.Cliente(1, 'João', '1');
var cliente2 = new Cliente_1.Cliente(2, 'Maria', '2');
var cliente3 = new Cliente_1.Cliente(3, 'Carlos', '3');
var cliTevis = new Cliente_1.Cliente(4, 'Tevis', '4');
banco.inserirCliente(cliente1);
banco.inserirCliente(cliente2);
banco.inserirCliente(cliente3);
banco.inserirCliente(cliTevis);
console.log('');
banco.inserirConta(new Conta_1.Conta('111-1', 100, 1));
banco.inserirConta(new Conta_1.Conta('222-2', 200, 2));
banco.inserirConta(new Conta_1.Conta('333-3', 300, 3));
banco.inserirConta(new Conta_1.Conta('444-4', 400, 4));
//TESTANDO REGRAS DE NEGOCIO
console.log('');
banco.associarContaCliente('111-1', '4');
banco.associarContaCliente('222-2', '4');
banco.associarContaCliente('222-2', '1'); //deve gerar erro
console.log('');
var cliIdRepetido = new Cliente_1.Cliente(4, 'Felipe', '5');
var cliCPFRepetido = new Cliente_1.Cliente(5, 'teste', '1');
banco.inserirCliente(cliIdRepetido); // deve gerar erro
banco.inserirCliente(cliCPFRepetido); // deve gerar erro
console.log('');
banco.inserirConta(new Conta_1.Conta('555-5', 500, 4)); // deve gerar erro
banco.inserirConta(new Conta_1.Conta('444-4', 500, 5)); // deve gerar erro
console.log(banco.listarContasDeUmCliente('4'));
console.log(banco.totalizadorSaldoCliente('4'));
