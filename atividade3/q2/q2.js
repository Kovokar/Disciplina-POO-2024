function saudacao(nome, pronome) {
    if (pronome === void 0) { pronome = "Sr"; }
    return "Bom dia ".concat(pronome, ". ").concat(nome);
}
console.log(saudacao("Sávia", "Sra")); // Saída: Sra. Sávia
// Chamando a função com o parâmetro de pronome omitido (irá usar o valor padrão "Sr")
console.log(saudacao("Carlos")); // Saída: Sr. Carlos
