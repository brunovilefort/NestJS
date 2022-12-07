import { Body, Controller, Logger, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { IChallenge } from './interface';
import { UpdateChallengeDTO, AssignChallengeDTO } from './dtos';
import { ChallengesService } from './challenges.service';

@Controller('api/challenges')
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() createChallenges: AssignChallengeDTO): Promise<IChallenge> {
    return await this.challengesService.createChallenge(createChallenges);
  }
}
