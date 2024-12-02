"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Banco = void 0;
var Banco = /** @class */ (function () {
    function Banco() {
        this.contas = [];
        this.clientes = [];
    }
    Banco.prototype.inserirConta = function (conta) {
        this.contas.push(conta);
    };
    Banco.prototype.inserirCliente = function (cliente) {
        this.clientes.push(cliente);
    };
    Banco.prototype.consultar = function (numero) {
        var contaProcurada;
        for (var _i = 0, _a = this.contas; _i < _a.length; _i++) {
            var conta = _a[_i];
            if (conta.numero == numero) {
                contaProcurada = conta;
                break;
            }
        }
        return contaProcurada;
    };
    Banco.prototype.consultaPorCpf = function (cpf) {
        var result = this.clientes.filter(function (key) { return key.cpf === cpf; });
        if (result.length > 0) {
            return result[0];
        }
        return null;
    };
    Banco.prototype.associarContaCliente = function (numeroConta, cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        var conta = this.consultar(numeroConta);
        cliente === null || cliente === void 0 ? void 0 : cliente.contas.push(conta);
    };
    Banco.prototype.listarContasDeUmCliente = function (cpfCliente) {
        var cliente = this.consultaPorCpf(cpfCliente);
        return cliente === null || cliente === void 0 ? void 0 : cliente.contas;
    };
    Banco.prototype.totalizadorSaldoCliente = function (cpf) {
        var contasDeCliente = this.listarContasDeUmCliente(cpf);
        var totalizador = 0;
        contasDeCliente === null || contasDeCliente === void 0 ? void 0 : contasDeCliente.forEach(function (element) {
            totalizador += element.saldo;
        });
        return totalizador;
    };
    return Banco;
}());
exports.Banco = Banco;
