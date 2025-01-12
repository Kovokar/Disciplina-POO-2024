export class Produto {
    private id_produto: number
    private desc_produto: string
    private qtd_produto: number
    private val_unitario: number

    constructor(id_produto: number, desc_produto: string, qtd_produto: number, val_unitario: number) {
        this.id_produto = id_produto
        this.desc_produto = desc_produto
        this.qtd_produto = qtd_produto
        this.val_unitario = val_unitario
    }

    public getId(): number {
        return this.id_produto
    }

    public getDescricao(): string {
        return this.desc_produto
    }

    public getQuantidade(): number {
        return this.qtd_produto
    }

    public getValorUnitario(): number {
        return this.val_unitario
    }

    public repor(qtd_produto: number): void {
        if (qtd_produto <= 0) {
            throw new Error("A qtd_produto a ser reposta deve ser positiva.")
        }
        this.qtd_produto += qtd_produto
    }

    public darBaixa(qtd_produto: number): void {
        if (qtd_produto <= 0) {
            throw new Error("A qtd_produto a ser baixada deve ser positiva.")
        }
        if (qtd_produto > this.qtd_produto) {
            throw new Error("qtd_produto insuficiente em estoque.")
        }
        this.qtd_produto -= qtd_produto
    }
}