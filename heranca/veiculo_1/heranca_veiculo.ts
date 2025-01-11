export class Veiculo {
    placa: String
    ano: number

    constructor(placa: String, ano: number){
        this.placa = placa
        this.ano = ano
    }
}

export class Carro extends Veiculo {
    modelo: String

    constructor(placa: String, ano: number, modelo: String){
        super(placa,ano)
        this.modelo = modelo
    }
}

export class CarroEletrico extends Carro{
    autonomiaBateria: number
    constructor(placa: String, ano: number, modelo: String, autonomiaBateria: number){
        super(placa,ano, modelo)
        this.autonomiaBateria = autonomiaBateria
    }

}




