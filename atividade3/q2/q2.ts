function saudacao(nome: string, pronome: string = "Sr"): String {
    return `Bom dia ${pronome}. ${nome}`
}

console.log(saudacao("Sávia", "Sra")) 
console.log(saudacao("Carlos"))