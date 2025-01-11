class Veiculo {
    placa: String
    ano: number

    constructor(placa: String, ano: number){
        this.placa = placa
        this.ano = ano
    }
}

class Carro extends Veiculo {
    modelo: String

    constructor(placa: String, ano: number, modelo: String){
        super(placa,ano)
        this.modelo = modelo
    }
}

class CarroEletrico extends Carro{
    autonomiaBateria: number
    constructor(placa: String, ano: number, modelo: String, autonomiaBateria: number){
        super(placa,ano, modelo)
        this.autonomiaBateria = autonomiaBateria
    }

}




const byd = new CarroEletrico("XYZ-5678", 2023, "Tesla Model S", 500)

console.log(byd)

