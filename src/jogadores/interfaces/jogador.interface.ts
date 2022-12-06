export interface Jogador {
  readonly _id: string;
  readonly phone: string;
  readonly email: string;
  readonly nome: string;
  ranking: string;
  positionRanking: number;
  urlPayer: string;
}
