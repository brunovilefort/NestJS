import { Document } from 'mongoose';

import { IPlayer } from '../../players';
import { ChallengeStatus } from './challenge-status-enum';

export interface IChallenge extends Document {
  dateHourChallenge: Date;
  status: ChallengeStatus;
  dateHourRequest: Date;
  dateHourResponse: Date;
  requester: IPlayer;
  categorie: string;
  players: Array<IPlayer>;
  match: IMatch;
}

export interface IMatch extends Document {
  categorie: string;
  players: Array<IPlayer>;
  def: IPlayer;
  result: Array<IResult>;
}

export interface IResult {
  set: string;
}
