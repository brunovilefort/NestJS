import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IChallenge } from './interface';
import { UpdateChallengeDTO, CreateChallengeDTO, AssignChallengeDTO } from './dtos';
import { ChallengesService } from './challenges.service';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation-pipe';

@Controller('api/challenges')
export class ChallengesController {
  private readonly logger = new Logger(ChallengesController.name);
  constructor(private readonly challengesService: ChallengesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(@Body() createChallenges: CreateChallengeDTO): Promise<IChallenge> {
    return await this.challengesService.createChallenge(createChallenges);
  }

  @Get()
  async checkChallenges(@Query('idPlayer') _id: string): Promise<Array<IChallenge>> {
    return _id ? await this.challengesService.checkPlayerChallenges(_id) : await this.challengesService.getAll();
  }

  @Put('/:challenge')
  async updateChallenge(
    @Body(ChallengeStatusValidationPipe) updateChallenge: UpdateChallengeDTO,
    @Param('challenge') _id: string,
  ): Promise<void> {
    await this.challengesService.updateChallenge(_id, updateChallenge);
  }

  @Post('/:challenge/match/')
  async assignChallengeMatch(
    @Body(ValidationPipe) challengeMatch: AssignChallengeDTO,
    @Param('challenge') _id: string,
  ): Promise<void> {
    return await this.challengesService.assignChallengeMatch(_id, challengeMatch);
  }

  @Delete('/:_id')
  async deleteChallenge(@Param('_id') _id: string): Promise<void> {
    await this.deleteChallenge(_id);
  }
}
