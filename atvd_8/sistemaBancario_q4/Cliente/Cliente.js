"use strict";
exports.__esModule = true;
exports.Cliente = void 0;
var AplicacaoError_1 = require("../AplicacaoError");
var Cliente = /** @class */ (function () {
    function Cliente(id, nome, cpf, dataNascimento) {
        this._contas = [];
        this.validarCPF(cpf);
        this.validarDataNascimento(dataNascimento);
        this._id = id;
        this._nome = nome;
        this._cpf = cpf;
        this._dataNascimento = dataNascimento;
    }
    // Métodos Getters
    Cliente.prototype.getIdCliente = function () {
        return this._id;
    };
    Cliente.prototype.getNome = function () {
        return this._nome;
    };
    Cliente.prototype.getCpf = function () {
        return this._cpf;
    };
    Cliente.prototype.getDtNascimento = function () {
        return this._dataNascimento;
    };
    Cliente.prototype.getContas = function () {
        return this._contas;
    };
    // Adicionar uma conta ao cliente
    Cliente.prototype.adicionarConta = function (conta) {
        // Verificar se a conta já está associada a outro cliente
        if (conta.isAssociada()) {
            var clienteAtual = conta.getCliente();
            if (clienteAtual && clienteAtual.getCpf() !== this._cpf) {
                throw new AplicacaoError_1.ContaJaAssociadaError(conta.getNumero(), clienteAtual.getCpf(), this._cpf);
            }
        }
        this._contas.push(conta);
        conta.setAssociada(true);
    };
    // Remover uma conta do cliente
    Cliente.prototype.removerConta = function (conta) {
        var index = this._contas.indexOf(conta);
        if (index !== -1) {
            this._contas.splice(index, 1);
        }
    };
    Cliente.prototype.validarCPF = function (cpf) {
        // Validação simples de CPF (apenas formato)
        var cpfLimpo = cpf.replace(/[^\d]/g, '');
        if (cpfLimpo.length !== 11 || !/^\d+$/.test(cpfLimpo)) {
            throw new AplicacaoError_1.CPFInvalidoError(cpf);
        }
    };
    Cliente.prototype.validarDataNascimento = function (dataNascimento) {
        var dataAtual = new Date();
        var idadeMinima = new Date(dataAtual.getFullYear() - 120, 0, 1);
        var idadeMaxima = new Date(dataAtual.getFullYear() - 18, 0, 1);
        if (dataNascimento > dataAtual || // Data no futuro
            dataNascimento < idadeMinima || // Muito antiga
            dataNascimento > idadeMaxima // Menor de 18 anos
        ) {
            throw new AplicacaoError_1.DataNascimentoInvalidaError(dataNascimento);
        }
    };
    return Cliente;
}());
exports.Cliente = Cliente;
