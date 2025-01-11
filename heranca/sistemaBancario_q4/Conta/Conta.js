"use strict";
exports.__esModule = true;
exports.Conta = void 0;
var Conta = /** @class */ (function () {
    function Conta(numero, saldo, id_conta) {
        this.numero = numero;
        this.saldo = saldo;
        this.id_conta = id_conta;
        this.st_assosciada = false;
    }
    // Métodos Getters
    Conta.prototype.getNumero = function () {
        return this.numero;
    };
    Conta.prototype.getSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.getIdConta = function () {
        return this.id_conta;
    };
    Conta.prototype.getCliente = function () {
        return this.cliente;
    };
    Conta.prototype.isAssociada = function () {
        return this.st_assosciada;
    };
    // Métodos de ação
    Conta.prototype.sacar = function (valor) {
        if (valor <= this.saldo) {
            this.saldo -= valor;
        }
        else {
            console.log("Saldo insuficiente");
        }
    };
    Conta.prototype.depositar = function (valor) {
        this.saldo += valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this.saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    // Setter para alterar o status de associação
    Conta.prototype.setAssociada = function (status) {
        this.st_assosciada = status;
    };
    return Conta;
}());
exports.Conta = Conta;
