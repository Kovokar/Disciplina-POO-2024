import { Produto } from "./Produto"
import { ProdutoPerecivel } from "./ProdutoPerecivel"

export class Estoque {
    private produtos: (Produto | ProdutoPerecivel)[] = [];

    private exist(id: number, descricao: string): boolean {
        return this.produtos.some(produto => produto.getId() === id || produto.getDescricao() === descricao);
    }

    public incluir(produto: Produto | ProdutoPerecivel): void {
        if (this.exist(produto.getId(), produto.getDescricao())) {
            throw new Error("Produto com o mesmo ID ou descrição já exist no estoque.");
        }
        this.produtos.push(produto);
    }

    public consultarPorId(id: number): Produto | ProdutoPerecivel | undefined {
        return this.produtos.find(produto => produto.getId() === id);
    }

    public excluir(id: number): void {
        const index = this.produtos.findIndex(produto => produto.getId() === id);
        if (index === -1) {
            throw new Error("Produto não encontrado.");
        }
        this.produtos.splice(index, 1);
    }

    public repor(id: number, quantidade: number): void {
        const produto = this.consultarPorId(id);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        produto.repor(quantidade);
    }

    public darBaixa(id: number, quantidade: number): void {
        const produto = this.consultarPorId(id);
        if (!produto) {
            throw new Error("Produto não encontrado.");
        }
        if (produto instanceof ProdutoPerecivel) {
            if (!produto.isValid()) {
                throw new Error("Não é possível repor. O produto está fora da validade.");
            }
        }
        produto.darBaixa(quantidade);
    }

    public listarProdutosPereciveisVencidos(): ProdutoPerecivel[] {
        return this.produtos.filter(produto => produto instanceof ProdutoPerecivel && produto.isValid() === false) as ProdutoPerecivel[];
    }

    public listarProdutos(): (Produto | ProdutoPerecivel)[] {
        return this.produtos;
    }
}