"use strict";
exports.__esModule = true;
exports.Calculadora = void 0;
var Calculadora = /** @class */ (function () {
    function Calculadora(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    Calculadora.prototype.getOperando1 = function () {
        return this.operando1;
    };
    Calculadora.prototype.getOperando2 = function () {
        return this.operando2;
    };
    Calculadora.prototype.setOperando1 = function (operando1) {
        this.operando1 = operando1;
    };
    Calculadora.prototype.setOperando2 = function (operando2) {
        this.operando2 = operando2;
    };
    Calculadora.prototype.sumOperandos = function () {
        return this.operando1 + this.operando2;
    };
    return Calculadora;
}());
exports.Calculadora = Calculadora;
