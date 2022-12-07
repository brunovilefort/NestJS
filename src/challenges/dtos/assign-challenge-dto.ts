import { ArrayMaxSize, ArrayMinSize, IsArray, IsDateString, IsNotEmpty } from 'class-validator';

import { IPlayer } from '../../players/interfaces';

export class AssignChallengeDTO {
  @IsNotEmpty()
  @IsDateString()
  dateHourChallenge: Date;
  @IsNotEmpty()
  requester: IPlayer;
  @IsArray()
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  players: Array<IPlayer>;
}
