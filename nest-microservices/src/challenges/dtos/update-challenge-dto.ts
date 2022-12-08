import { IsOptional } from 'class-validator';
import { ChallengeStatus } from '../interface';

export class UpdateChallengeDTO {
  @IsOptional()
  dateHourChallenge?: Date;
  @IsOptional()
  status?: ChallengeStatus;
}
