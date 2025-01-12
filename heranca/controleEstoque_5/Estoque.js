"use strict";
exports.__esModule = true;
exports.Estoque = void 0;
var ProdutoPerecivel_1 = require("./ProdutoPerecivel");
var Estoque = /** @class */ (function () {
    function Estoque() {
        this.produtos = [];
    }
    Estoque.prototype.exist = function (id, descricao) {
        return this.produtos.some(function (produto) { return produto.getId() === id || produto.getDescricao() === descricao; });
    };
    Estoque.prototype.incluir = function (produto) {
        if (this.exist(produto.getId(), produto.getDescricao())) {
            throw new Error("Produto com o mesmo ID ou descrição já exist no estoque.");
        }
        this.produtos.push(produto);
    };
    Estoque.prototype.consultarPorId = function (id) {
        return this.produtos.find(function (produto) { return produto.getId() === id; });
    };
    Estoque.prototype.excluir = function (id) {
        var index = this.produtos.findIndex(function (produto) { return produto.getId() === id; });
        if (index === -1) {
            throw new Error("Produto não encontrado.");
        }
        this.produtos.splice(index, 1);
    };
    Estoque.prototype.repor = function (id, quantidade) {
        var produto = this.consultarPorId(id);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        produto.repor(quantidade);
    };
    Estoque.prototype.darBaixa = function (id, quantidade) {
        var produto = this.consultarPorId(id);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        if (produto instanceof ProdutoPerecivel_1.ProdutoPerecivel) {
            if (!produto.isValid()) {
                throw new Error("Não é possível repor. O produto está fora da validade.");
            }
        }
        produto.darBaixa(quantidade);
    };
    Estoque.prototype.listarProdutosPereciveisVencidos = function () {
        return this.produtos.filter(function (produto) { return produto instanceof ProdutoPerecivel_1.ProdutoPerecivel && produto.isValid() === false; });
    };
    Estoque.prototype.listarProdutos = function () {
        return this.produtos;
    };
    return Estoque;
}());
exports.Estoque = Estoque;
