// import {heranca_veiculo} from './heranca_veiculo'
import {Calculadora} from './calculadora_2/calculadora'
import {Carro, Veiculo, CarroEletrico} from './veiculo_1/heranca_veiculo'


function Q1(): void{
    const byd = new CarroEletrico("XYZ-5678", 2023, "Tesla Model S", 500)
    console.log(byd)
}

function Q2(): void{
    const calc = new Calculadora(1,2)
    console.log(calc.sumOperandos())
}



Q1()
Q2()