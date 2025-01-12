import { Produto } from "./Produto"
import { ProdutoPerecivel } from "./ProdutoPerecivel"
import { Estoque } from "./Estoque"

const produto1 = new Produto(1, "Produto A", 10, 100)
const produto2 = new ProdutoPerecivel(2, "Produto B", 5, 50, new Date("2024-12-31"))
const produto3 = new ProdutoPerecivel(3, "Produto C", 3, 20, new Date("2025-01-10"))

const estoque = new Estoque()
estoque.incluir(produto1)
estoque.incluir(produto2)
estoque.incluir(produto3)

const produtoConsultado = estoque.consultarPorId(2)
console.log(produtoConsultado)

estoque.repor(1, 5)
estoque.repor(2, 3)

estoque.darBaixa(1, 2)

const produtosVencidos = estoque.listarProdutosPereciveisVencidos()
console.log(produtosVencidos)

estoque.excluir(3)

const todosProdutos = estoque.listarProdutos()


console.log(todosProdutos)