// import {heranca_veiculo} from './heranca_veiculo'
import {Carro, Veiculo, CarroEletrico} from './veiculo_1/heranca_veiculo'
import {Calculadora} from './calculadora_2/calculadora'
import {CalculadoraCientifica} from './calculadora_cientifica_3/CalculadoraCientifica'
import {gerenciarEstoque} from './controleEstoque_5/app'
import {perguntar} from './sistemaBancario_q4/app'


function Q1(): void{
    const byd = new CarroEletrico("XYZ-5678", 2023, "Tesla Model S", 500)
    console.log(byd)
}

function Q2(): void{
    const calc = new Calculadora(1,2)
    console.log(calc.sumOperandos())
}

function Q3(): void{
    const calcCient = new CalculadoraCientifica(3,2)
    console.log(calcCient.exponencia())
}

function Q4(): void{
    perguntar()
}

function Q5(): void{
    gerenciarEstoque()
}

Q1()
// Q2()
// Q3()
// Q4()
// Q5()