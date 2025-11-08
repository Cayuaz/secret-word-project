const wordsList = {
  carro: ["Motor", "Porta", "Capô", "Pneu", "Antena"],
  fruta: ["Banana", "Maçã", "Pêra", "Mamão", "Laranja", "Morango", "Uva"],
  corpo: ["Braço", "Perna", "Cérebro", "Pescoço", "Olhos"],
  computador: ["Mouse", "Teclado", "Monitor", "Gabinete"],
  programação: ["Linguagem", "Framework", "JavaScript", "React"],
  comidas: ["Bolo", "Pizza", "Batata", "Lasanha", "Sorvete"],
};

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

//Criação de um type alias com os tipos das keys da wordsList
type wordsListKeys = keyof typeof wordsList;

export { wordsList, stages };
export type { wordsListKeys };
