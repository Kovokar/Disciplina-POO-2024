"use strict";
exports.__esModule = true;
exports.Produto = void 0;
var Produto = /** @class */ (function () {
    function Produto(id_produto, desc_produto, qtd_produto, val_unitario) {
        this.id_produto = id_produto;
        this.desc_produto = desc_produto;
        this.qtd_produto = qtd_produto;
        this.val_unitario = val_unitario;
    }
    Produto.prototype.getId = function () {
        return this.id_produto;
    };
    Produto.prototype.getDescricao = function () {
        return this.desc_produto;
    };
    Produto.prototype.getQuantidade = function () {
        return this.qtd_produto;
    };
    Produto.prototype.getValorUnitario = function () {
        return this.val_unitario;
    };
    Produto.prototype.repor = function (qtd_produto) {
        if (qtd_produto <= 0) {
            throw new Error("A qtd_produto a ser reposta deve ser positiva.");
        }
        this.qtd_produto += qtd_produto;
    };
    Produto.prototype.darBaixa = function (qtd_produto) {
        if (qtd_produto <= 0) {
            throw new Error("A qtd_produto a ser baixada deve ser positiva.");
        }
        if (qtd_produto > this.qtd_produto) {
            throw new Error("qtd_produto insuficiente em estoque.");
        }
        this.qtd_produto -= qtd_produto;
    };
    return Produto;
}());
exports.Produto = Produto;
