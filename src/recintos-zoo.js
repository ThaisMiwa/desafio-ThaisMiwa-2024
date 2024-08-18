class RecintosZoo {
  constructor() {
    this.animais = {
      LEAO: { tamanho: 3, bioma: ["savana"], carnivoro: true },
      LEOPARDO: { tamanho: 2, bioma: ["savana"], carnivoro: true },
      CROCODILO: { tamanho: 3, bioma: ["rio"], carnivoro: true },
      MACACO: { tamanho: 1, bioma: ["savana", "floresta"], carnivoro: false },
      GAZELA: { tamanho: 2, bioma: ["savana"], carnivoro: false },
      HIPOPOTAMO: { tamanho: 4, bioma: ["savana", "rio"], carnivoro: false },
    };
    this.recintos = [
      {
        numero: 1,
        bioma: ["savana"],
        tamanhoTotal: 10,
        animais: ["MACACO"],
        quantidadeOcupada: 3,
        temCarnivoro: false,
      },
      {
        numero: 2,
        bioma: ["floresta"],
        tamanhoTotal: 5,
        animais: [],
        quantidadeOcupada: 0,
        temCarnivoro: false,
      },
      {
        numero: 3,
        bioma: ["savana", "rio"],
        tamanhoTotal: 7,
        animais: ["GAZELA"],
        quantidadeOcupada: 2,
        temCarnivoro: false,
      },
      {
        numero: 4,
        bioma: ["rio"],
        tamanhoTotal: 8,
        animais: [],
        quantidadeOcupada: 0,
        temCarnivoro: true,
      },
      {
        numero: 5,
        bioma: ["savana"],
        tamanhoTotal: 9,
        animais: ["LEAO"],
        quantidadeOcupada: 3,
        temCarnivoro: true,
      },
    ];
  }

  gerarErro(erro) {
    return { erro: erro, recintosViaveis: false };
  }

  gerarMensagem(recintos, novosAnimais, animal, quantidade) {
    let mensagem = recintos.map(
      (recinto) =>
        `Recinto ${
          recinto.numero
        } (espaço livre: ${this.calcularQuantidadeAposInsercao(
          recinto,
          novosAnimais,
          animal,
          quantidade
        )} total: ${recinto.tamanhoTotal})`
    );

    return { erro: null, recintosViaveis: mensagem };
  }

  calcularQuantidadeAposInsercao(recinto, novosAnimais, animal, quantidade) {
    let calculoPadrao =
      recinto.tamanhoTotal -
      recinto.quantidadeOcupada -
      novosAnimais.tamanho * quantidade;

    if (
      recinto.animais.length > 0 &&
      recinto.animais.some((animalDoRecinto) => animalDoRecinto !== animal)
    ) {
      return calculoPadrao - 1;
    }

    return calculoPadrao;
  }

  buscarRecintoCarnivoro() {
    return this.recintos.filter((recinto) => recinto.temCarnivoro);
  }

  buscarRecintoNaoCarnivoro() {
    return this.recintos.filter((recinto) => !recinto.temCarnivoro);
  }

  buscarRecintosDisponiveis(novosAnimais, quantidade) {
    let tamanhoNecessario = novosAnimais.tamanho * quantidade;
    let recinto = novosAnimais.carnivoro
      ? this.buscarRecintoCarnivoro()
      : this.buscarRecintoNaoCarnivoro();

    return recinto.filter(
      (recinto) =>
        recinto.bioma.some((bioma) => novosAnimais.bioma.includes(bioma)) &&
        recinto.tamanhoTotal - recinto.quantidadeOcupada >= tamanhoNecessario
    );
  }

  analisaRecintos(animal, quantidade) {
    if (!this.animais[animal]) {
      return this.gerarErro("Animal inválido");
    }

    if (quantidade <= 0) {
      return this.gerarErro("Quantidade inválida");
    }

    let novosAnimais = this.animais[animal];
    let possiveisRecintos = [];

    possiveisRecintos = this.buscarRecintosDisponiveis(
      novosAnimais,
      quantidade
    );

    if (possiveisRecintos.length === 0) {
      return this.gerarErro("Não há recinto viável");
    }

    return this.gerarMensagem(
      possiveisRecintos,
      novosAnimais,
      animal,
      quantidade
    );
  }
}

export { RecintosZoo as RecintosZoo };
