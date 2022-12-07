import { Document } from 'mongoose';

import { IPlayer } from 'src/players/interfaces';

export interface ICategories extends Document {
  readonly categorie: string;
  description: string;
  events: Array<Event>;
  player: Array<IPlayer>;
}

export interface Event {
  name: string;
  operation: string;
  value: number;
}
