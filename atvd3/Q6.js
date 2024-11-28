var nome = 'Ely';
var paymentTime = 120.56;
var language = 'TypeScript';
// Correção: Adicionando as crases ` (backticks) para definir o template literal
var message = "".concat(nome, "\nMy payment time is ").concat(paymentTime, " and\nmy preferred language is ").concat(language);
console.log(message);
