import { Conta } from "../Conta/Conta"


export class Poupanca extends Conta {  
    private _taxaDeJuros: number;

    constructor(numero: string, saldo: number, id_conta: number, taxaDeJuros: number) {
        super(numero,saldo, id_conta);
        this._taxaDeJuros = taxaDeJuros;
    }


    public renderJuros() {
        let juros: number = this.getSaldo() * this._taxaDeJuros/100;
        this.depositar(juros);        
    }
}


