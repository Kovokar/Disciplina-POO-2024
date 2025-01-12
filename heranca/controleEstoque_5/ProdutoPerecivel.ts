import { Produto } from "./Produto"

export class ProdutoPerecivel extends Produto {
    private dt_validade: Date

    constructor(id_produto: number, desc_produto: string, qtd_produto: number, val_unitario: number, dt_validade: Date) {
        super(id_produto, desc_produto, qtd_produto, val_unitario)
        this.dt_validade = dt_validade
    }

    public isValid() :boolean {
        return this.dt_validade > new Date()
    }

    public repor(qtd_produto: number): void {
        if (!this.isValid()) {
            console.error("Não é possível repor, o produto está fora da validade.")
        }
        super.repor(qtd_produto)
    }

    public darBaixa(qtd_produto: number): void{
        if (!this.isValid()) {
            console.error("Não é possível dar baixa, o produto está fora da validade.")
        }
        super.darBaixa(qtd_produto)
    }
}