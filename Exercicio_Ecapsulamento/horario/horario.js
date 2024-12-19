var Hora = /** @class */ (function () {
    function Hora(hora, minutos, segundos) {
        this.hora = hora;
        this.minutos = minutos;
        this.segundos = segundos;
    }
    Hora.prototype.lerHora = function () {
        return this.hora;
    };
    Hora.prototype.lerMinutos = function () {
        return this.minutos;
    };
    Hora.prototype.lerSegundos = function () {
        return this.segundos;
    };
    Hora.prototype.mostrarHora = function () {
        var horaFormatada = this.hora.toString().padStart(2, '0');
        var minutosFormatados = this.minutos.toString().padStart(2, '0');
        var segundosFormatados = this.segundos.toString().padStart(2, '0');
        return "".concat(horaFormatada, ":").concat(minutosFormatados, ":").concat(segundosFormatados);
    };
    return Hora;
}());
var minhaHora = new Hora(9, 5, 30);
// console.log(minhaHora.lerHora())       
// console.log(minhaHora.lerMinutos())     
// console.log(minhaHora.lerSegundos())
console.log(minhaHora.mostrarHora());
