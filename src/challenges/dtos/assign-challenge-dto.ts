import { IsNotEmpty } from 'class-validator';

import { IPlayer } from '../../players/interfaces';
import { IResult } from '../interface';

export class AssignChallengeDTO {
  @IsNotEmpty()
  def: IPlayer;
  @IsNotEmpty()
  result: Array<IResult>;
}
