"use strict";
exports.__esModule = true;
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(id_cliente, nome, cpf) {
        this.nome = nome;
        this.id_cliente = id_cliente;
        this.cpf = cpf;
        this.contas = [];
    }
    return Cliente;
}());
exports.Cliente = Cliente;
