"use strict";
exports.__esModule = true;
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id_cliente, nome, cpf) {
        this.id_cliente = id_cliente;
        this.nome = nome;
        this.cpf = cpf;
        this.contas = [];
    }
    // Métodos Getters
    Cliente.prototype.getIdCliente = function () {
        return this.id_cliente;
    };
    Cliente.prototype.getNome = function () {
        return this.nome;
    };
    Cliente.prototype.getCpf = function () {
        return this.cpf;
    };
    Cliente.prototype.getDtNascimento = function () {
        return this.dt_nascimento;
    };
    Cliente.prototype.getContas = function () {
        return this.contas;
    };
    // Adicionar uma conta ao cliente
    Cliente.prototype.adicionarConta = function (conta) {
        this.contas.push(conta);
    };
    // Remover uma conta do cliente
    Cliente.prototype.removerConta = function (conta) {
        var index = this.contas.indexOf(conta);
        if (index !== -1) {
            this.contas.splice(index, 1);
        }
    };
    return Cliente;
}());
exports.Cliente = Cliente;
