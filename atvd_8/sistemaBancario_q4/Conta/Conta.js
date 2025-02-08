"use strict";
exports.__esModule = true;
exports.Conta = void 0;
var AplicacaoError_1 = require("../AplicacaoError");
var Conta = /** @class */ (function () {
    function Conta(numero, saldo, id) {
        this._cliente = null;
        this._numero = numero;
        this.id_conta = id || 0;
        this.st_assosciada = false;
        this._saldo = 0;
        // Usando o método depositar para atribuir o saldo inicial
        this.depositar(saldo);
    }
    // Métodos Getters
    Conta.prototype.getNumero = function () {
        return this._numero;
    };
    Conta.prototype.getSaldo = function () {
        return this._saldo;
    };
    Conta.prototype.getIdConta = function () {
        return this.id_conta;
    };
    Conta.prototype.getCliente = function () {
        return this._cliente;
    };
    Conta.prototype.isAssociada = function () {
        return this.st_assosciada;
    };
    // Métodos de ação
    Conta.prototype.sacar = function (valor) {
        this.validaValor(valor, 'saque');
        if (valor > this._saldo) {
            throw new AplicacaoError_1.SaldoInsuficienteError(this._saldo, valor);
        }
        this._saldo -= valor;
    };
    Conta.prototype.depositar = function (valor) {
        this.validaValor(valor, 'depósito');
        this._saldo += valor;
    };
    Conta.prototype.consultarSaldo = function () {
        return this._saldo;
    };
    Conta.prototype.transferir = function (contaDestino, valor) {
        this.sacar(valor);
        contaDestino.depositar(valor);
    };
    // Setter para alterar o status de associação
    Conta.prototype.setAssociada = function (status) {
        this.st_assosciada = status;
    };
    Conta.prototype.validaValor = function (valor, operacao) {
        if (isNaN(valor) || valor <= 0) {
            throw new AplicacaoError_1.ValorInvalidoError(valor, operacao);
        }
    };
    return Conta;
}());
exports.Conta = Conta;
