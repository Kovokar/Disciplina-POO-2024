var Filho = /** @class */ (function () {
    function Filho(nome, idade) {
        this.nome = nome;
        this.idade = idade;
    }
    return Filho;
}());
var Pais = /** @class */ (function () {
    function Pais(nomes, idades) {
        this.nomes = nomes;
        this.idades = idades;
        this.filhos = [];
    }
    // Método para adicionar um filho ao array, verificando se o nome já existe
    Pais.prototype.adicionarFilho = function (filho) {
        var nomeExiste = this.filhos.some(function (f) { return f.nome === filho.nome; });
        if (nomeExiste) {
            console.log("J\u00E1 existe um filho com o nome ".concat(filho.nome, ". N\u00E3o \u00E9 poss\u00EDvel adicionar."));
        }
        else {
            this.filhos.push(filho);
            console.log("Filho ".concat(filho.nome, " adicionado com sucesso."));
        }
    };
    // Método para exibir informações do pai e dos filhos
    Pais.prototype.exibirInformacoes = function () {
        console.log("Pais: ".concat(this.nomes, ", Idade: ").concat(this.idades));
        console.log("Filhos:");
        this.filhos.forEach(function (filho) {
            console.log("Nome: ".concat(filho.nome, ", Idade: ").concat(filho.idade));
        });
    };
    return Pais;
}());
// Exemplo de uso
var pai = new Pais("João", 40);
var filho1 = new Filho("Pedro", 10);
var filho2 = new Filho("Maria", 8);
var filho3 = new Filho("Pedro", 5); // Filho com nome duplicado
pai.adicionarFilho(filho1);
pai.adicionarFilho(filho2);
pai.adicionarFilho(filho3); // Não será adicionado devido ao nome duplicado
pai.exibirInformacoes();
