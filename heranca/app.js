"use strict";
exports.__esModule = true;
// import {heranca_veiculo} from './heranca_veiculo'
var heranca_veiculo_1 = require("./veiculo_1/heranca_veiculo");
var calculadora_1 = require("./calculadora_2/calculadora");
var CalculadoraCientifica_1 = require("./calculadora_cientifica_3/CalculadoraCientifica");
var app_1 = require("./sistemaBancario_q4/app");
function Q1() {
    var byd = new heranca_veiculo_1.CarroEletrico("XYZ-5678", 2023, "Tesla Model S", 500);
    console.log(byd);
}
function Q2() {
    var calc = new calculadora_1.Calculadora(1, 2);
    console.log(calc.sumOperandos());
}
function Q3() {
    var calcCient = new CalculadoraCientifica_1.CalculadoraCientifica(3, 2);
    console.log(calcCient.exponencia());
}
function Q4() {
    (0, app_1.perguntar)();
}
// function Q5(): void{
//     gerenciarEstoque()
// }
// Q1()
// Q2()
// Q3()
Q4();
// Q5()
