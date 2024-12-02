function exibir() {
    var palavras = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        palavras[_i] = arguments[_i];
    }
    for (var _a = 0, palavras_1 = palavras; _a < palavras_1.length; _a++) {
        var palavra = palavras_1[_a];
        console.log(palavra);
    }
}
exibir("a", "b");
exibir("a", "b", "c");
exibir("a", "b", "c", "d");
