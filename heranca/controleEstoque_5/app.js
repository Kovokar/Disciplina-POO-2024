"use strict";
exports.__esModule = true;
exports.gerenciarEstoque = void 0;
var Produto_1 = require("./Produto");
var ProdutoPerecivel_1 = require("./ProdutoPerecivel");
var Estoque_1 = require("./Estoque");
function gerenciarEstoque() {
    var produto1 = new Produto_1.Produto(1, "Produto A", 10, 100);
    var produto2 = new ProdutoPerecivel_1.ProdutoPerecivel(2, "Produto B", 5, 50, new Date("2024-12-31"));
    var produto3 = new ProdutoPerecivel_1.ProdutoPerecivel(3, "Produto C", 3, 20, new Date("2025-01-10"));
    var estoque = new Estoque_1.Estoque();
    estoque.incluir(produto1);
    estoque.incluir(produto2);
    estoque.incluir(produto3);
    var produtoConsultado = estoque.consultarPorId(2);
    console.log("Produto Consultado:", produtoConsultado);
    estoque.repor(1, 5);
    estoque.repor(2, 3);
    estoque.darBaixa(1, 2);
    var produtosVencidos = estoque.listarProdutosPereciveisVencidos();
    console.log("Produtos Perecíveis Vencidos:", produtosVencidos);
    estoque.excluir(3);
    var todosProdutos = estoque.listarProdutos();
    console.log("Todos os Produtos no Estoque:", todosProdutos);
}
exports.gerenciarEstoque = gerenciarEstoque;
gerenciarEstoque();
