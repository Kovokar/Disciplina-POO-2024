var Calculadora = /** @class */ (function () {
    function Calculadora(operando1, operando2) {
        this.operando1 = operando1;
        this.operando2 = operando2;
    }
    Calculadora.prototype.somar = function () {
        return this.operando1 + this.operando2;
    };
    Calculadora.prototype.subtrair = function () {
        return this.operando1 - this.operando2;
    };
    Calculadora.prototype.multiplicar = function () {
        return this.operando1 * this.operando2;
    };
    Calculadora.prototype.dividir = function () {
        if (!this.operando2) {
            return ("Não é possível dividir por zero.");
        }
        return this.operando1 / this.operando2;
    };
    return Calculadora;
}());
var calc = new Calculadora(10, 0);
console.log("Soma: " + calc.somar());
console.log("Subtração: " + calc.subtrair());
console.log("Multiplicação: " + calc.multiplicar());
console.log("Divisão: " + calc.dividir());
