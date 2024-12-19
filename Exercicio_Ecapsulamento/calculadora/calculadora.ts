class Calculadora {
    private operando1: number
    private operando2: number
  
    constructor(operando1: number, operando2: number) {
      this.operando1 = operando1
      this.operando2 = operando2
    }
  
    public somar(): number {
      return this.operando1 + this.operando2
    }
  
    public subtrair(): number {
      return this.operando1 - this.operando2
    }
  
    public multiplicar(): number {
      return this.operando1 * this.operando2
    }
  
    public dividir(): number | string{
      if (!this.operando2) {
        return ("Não é possível dividir por zero.")
      }
      return this.operando1 / this.operando2
    }
  }
  
  const calc = new Calculadora(10, 0)
  
  console.log("Soma: " + calc.somar())       
  console.log("Subtração: " + calc.subtrair()) 
  console.log("Multiplicação: " + calc.multiplicar())
  console.log("Divisão: " + calc.dividir())
