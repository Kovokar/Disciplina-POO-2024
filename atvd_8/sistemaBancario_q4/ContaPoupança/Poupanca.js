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
exports.Poupanca = void 0;
var Conta_1 = require("../Conta/Conta");
var Poupanca = /** @class */ (function (_super) {
    __extends(Poupanca, _super);
    function Poupanca(numero, saldo, id_conta, taxaDeJuros) {
        var _this = _super.call(this, numero, saldo, id_conta) || this;
        _this._taxaDeJuros = taxaDeJuros;
        return _this;
    }
    Poupanca.prototype.renderJuros = function () {
        var juros = this.getSaldo() * this._taxaDeJuros / 100;
        this.depositar(juros);
    };
    return Poupanca;
}(Conta_1.Conta));
exports.Poupanca = Poupanca;
