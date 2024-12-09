class Filho {
    nome: string;
    idade: number;
  
    constructor(nome: string, idade: number) {
      this.nome = nome;
      this.idade = idade;
    }
  }
  
  class Pais {
    nomes: string;
    idades: number;
    filhos: Filho[];
  
    constructor(nomes: string, idades: number) {
      this.nomes = nomes;
      this.idades = idades;
      this.filhos = [];
    }
  
    // Método para adicionar um filho ao array, verificando se o nome já existe
    adicionarFilho(filho: Filho): void {
      const nomeExiste = this.filhos.some(f => f.nome === filho.nome);
      
      if (nomeExiste) {
        console.log(`Já existe um filho com o nome ${filho.nome}. Não é possível adicionar.`);
      } else {
        this.filhos.push(filho);
        console.log(`Filho ${filho.nome} adicionado com sucesso.`);
      }
    }
  
    // Método para exibir informações do pai e dos filhos
    exibirInformacoes(): void {
      console.log(`Pais: ${this.nomes}, Idade: ${this.idades}`);
      console.log("Filhos:");
      this.filhos.forEach(filho => {
        console.log(`Nome: ${filho.nome}, Idade: ${filho.idade}`);
      });
    }
  }
  
  // Exemplo de uso
  
  const pai = new Pais("João", 40);
  const filho1 = new Filho("Pedro", 10);
  const filho2 = new Filho("Maria", 8);
  const filho3 = new Filho("Pedro", 5);  // Filho com nome duplicado
  
  pai.adicionarFilho(filho1);
  pai.adicionarFilho(filho2);
  pai.adicionarFilho(filho3);  // Não será adicionado devido ao nome duplicado
  
  pai.exibirInformacoes();