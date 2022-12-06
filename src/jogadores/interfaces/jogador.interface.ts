import { Document } from 'mongoose';

export interface Jogador extends Document {
  readonly phone: string;
  readonly email: string;
  name: string;
  ranking: string;
  positionRanking: number;
  urlPayer: string;
}
