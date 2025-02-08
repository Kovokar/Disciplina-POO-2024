"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.NumeroContaInvalidoError = exports.EntradaInvalidaError = exports.EntradaVaziaError = exports.ContaJaAssociadaError = exports.DataNascimentoInvalidaError = exports.CPFInvalidoError = exports.PoupancaInvalidaError = exports.SaldoInsuficienteError = exports.ClienteNaoEncontradoError = exports.ContaInexistenteError = exports.ValorInvalidoError = exports.AplicacaoError = void 0;
var AplicacaoError = /** @class */ (function (_super) {
    __extends(AplicacaoError, _super);
    function AplicacaoError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'AplicacaoError';
        return _this;
    }
    return AplicacaoError;
}(Error));
exports.AplicacaoError = AplicacaoError;
var ValorInvalidoError = /** @class */ (function (_super) {
    __extends(ValorInvalidoError, _super);
    function ValorInvalidoError(valor, operacao) {
        var _this = _super.call(this, "Valor inv\u00E1lido para ".concat(operacao, ". Valor recebido: R$").concat(valor.toFixed(2), ". O valor deve ser positivo.")) || this;
        _this.name = 'ValorInvalidoError';
        return _this;
    }
    return ValorInvalidoError;
}(AplicacaoError));
exports.ValorInvalidoError = ValorInvalidoError;
var ContaInexistenteError = /** @class */ (function (_super) {
    __extends(ContaInexistenteError, _super);
    function ContaInexistenteError(numeroConta) {
        var _this = _super.call(this, "Conta ".concat(numeroConta, " n\u00E3o encontrada no banco.")) || this;
        _this.name = 'ContaInexistenteError';
        return _this;
    }
    return ContaInexistenteError;
}(AplicacaoError));
exports.ContaInexistenteError = ContaInexistenteError;
var ClienteNaoEncontradoError = /** @class */ (function (_super) {
    __extends(ClienteNaoEncontradoError, _super);
    function ClienteNaoEncontradoError(cpf) {
        var _this = _super.call(this, "Cliente com CPF ".concat(cpf, " n\u00E3o encontrado.")) || this;
        _this.name = 'ClienteNaoEncontradoError';
        return _this;
    }
    return ClienteNaoEncontradoError;
}(AplicacaoError));
exports.ClienteNaoEncontradoError = ClienteNaoEncontradoError;
var SaldoInsuficienteError = /** @class */ (function (_super) {
    __extends(SaldoInsuficienteError, _super);
    function SaldoInsuficienteError(saldoAtual, valorSaque) {
        var _this = _super.call(this, "Saldo insuficiente. Saldo atual: R$".concat(saldoAtual.toFixed(2), ", Valor do saque: R$").concat(valorSaque.toFixed(2))) || this;
        _this.name = 'SaldoInsuficienteError';
        return _this;
    }
    return SaldoInsuficienteError;
}(AplicacaoError));
exports.SaldoInsuficienteError = SaldoInsuficienteError;
var PoupancaInvalidaError = /** @class */ (function (_super) {
    __extends(PoupancaInvalidaError, _super);
    function PoupancaInvalidaError(numeroConta) {
        var _this = _super.call(this, "Conta ".concat(numeroConta, " n\u00E3o \u00E9 uma Conta Poupan\u00E7a v\u00E1lida.")) || this;
        _this.name = 'PoupancaInvalidaError';
        return _this;
    }
    return PoupancaInvalidaError;
}(AplicacaoError));
exports.PoupancaInvalidaError = PoupancaInvalidaError;
var CPFInvalidoError = /** @class */ (function (_super) {
    __extends(CPFInvalidoError, _super);
    function CPFInvalidoError(cpf) {
        var _this = _super.call(this, "CPF inv\u00E1lido: ".concat(cpf, ". O CPF deve conter 11 d\u00EDgitos num\u00E9ricos.")) || this;
        _this.name = 'CPFInvalidoError';
        return _this;
    }
    return CPFInvalidoError;
}(AplicacaoError));
exports.CPFInvalidoError = CPFInvalidoError;
var DataNascimentoInvalidaError = /** @class */ (function (_super) {
    __extends(DataNascimentoInvalidaError, _super);
    function DataNascimentoInvalidaError(dataNascimento) {
        var _this = _super.call(this, "Data de nascimento inv\u00E1lida: ".concat(dataNascimento.toLocaleDateString(), ". A data n\u00E3o pode ser futura ou muito antiga.")) || this;
        _this.name = 'DataNascimentoInvalidaError';
        return _this;
    }
    return DataNascimentoInvalidaError;
}(AplicacaoError));
exports.DataNascimentoInvalidaError = DataNascimentoInvalidaError;
var ContaJaAssociadaError = /** @class */ (function (_super) {
    __extends(ContaJaAssociadaError, _super);
    function ContaJaAssociadaError(numeroConta, cpfAtual, cpfNovo) {
        var _this = _super.call(this, "Conta ".concat(numeroConta, " j\u00E1 est\u00E1 associada ao cliente com CPF ").concat(cpfAtual, ". N\u00E3o \u00E9 permitido associar a outro cliente (CPF ").concat(cpfNovo, ").")) || this;
        _this.name = 'ContaJaAssociadaError';
        return _this;
    }
    return ContaJaAssociadaError;
}(AplicacaoError));
exports.ContaJaAssociadaError = ContaJaAssociadaError;
var EntradaVaziaError = /** @class */ (function (_super) {
    __extends(EntradaVaziaError, _super);
    function EntradaVaziaError(campo) {
        var _this = _super.call(this, "O campo ".concat(campo, " n\u00E3o pode estar vazio.")) || this;
        _this.name = 'EntradaVaziaError';
        return _this;
    }
    return EntradaVaziaError;
}(AplicacaoError));
exports.EntradaVaziaError = EntradaVaziaError;
var EntradaInvalidaError = /** @class */ (function (_super) {
    __extends(EntradaInvalidaError, _super);
    function EntradaInvalidaError(campo, mensagemAdicional) {
        var _this = _super.call(this, "Entrada inv\u00E1lida para o campo ".concat(campo, ".") +
            (mensagemAdicional ? " ".concat(mensagemAdicional) : '')) || this;
        _this.name = 'EntradaInvalidaError';
        return _this;
    }
    return EntradaInvalidaError;
}(AplicacaoError));
exports.EntradaInvalidaError = EntradaInvalidaError;
var NumeroContaInvalidoError = /** @class */ (function (_super) {
    __extends(NumeroContaInvalidoError, _super);
    function NumeroContaInvalidoError(numeroConta) {
        var _this = _super.call(this, "N\u00FAmero de conta inv\u00E1lido: ".concat(numeroConta, ". Deve seguir o formato XXX-X.")) || this;
        _this.name = 'NumeroContaInvalidoError';
        return _this;
    }
    return NumeroContaInvalidoError;
}(AplicacaoError));
exports.NumeroContaInvalidoError = NumeroContaInvalidoError;
