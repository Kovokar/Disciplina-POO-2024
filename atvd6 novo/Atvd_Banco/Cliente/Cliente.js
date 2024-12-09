"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
