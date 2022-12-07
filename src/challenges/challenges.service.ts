import { BadGatewayException, BadRequestException, Injectable, Logger } from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';
import { AssignChallengeDTO } from './dtos';
import { ChallengeStatus, IChallenge, IMatch } from './interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ChallengesService {
  private readonly logger = new Logger(ChallengesService.name);
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<IChallenge>,
    @InjectModel('Match') private readonly matchModel: Model<IMatch>,
    private readonly categoriesService: CategoriesService,
    private readonly playersService: PlayersService,
  ) {}

  async createChallenge(createChallenges: AssignChallengeDTO): Promise<IChallenge> {
    const allPlayers = await this.playersService.getAll();
    createChallenges.players.map((playerDto) => {
      const playerFilter = allPlayers.filter((player) => player._id === playerDto._id);
      if (playerFilter.length === 0) throw new BadRequestException(`The id ${playerDto._id} is not a valid player.`);
    });
    const isRequesterPlayerOfMatch = await createChallenges.players.filter(
      (player) => player._id === createChallenges.requester,
    );
    this.logger.log(`IsRequesterPlayerOfMatch: ${isRequesterPlayerOfMatch}`);
    if (isRequesterPlayerOfMatch.length === 0) {
      throw new BadGatewayException(`The requester must be a player in the match.`);
    }
    const playerCategorie = await this.categoriesService.checkPlayerCategory(createChallenges.requester);
    if (!playerCategorie) throw new BadRequestException(`The requester needs to be registered in a category!`);
    const createdChallenge = new this.challengeModel(createChallenges);
    createdChallenge.categorie = playerCategorie.categorie;
    createdChallenge.dateHourRequest = new Date();
    createdChallenge.status = ChallengeStatus.PENDING;
    this.logger.log(`Challenge created: ${JSON.stringify(createdChallenge)}`);
    return await createdChallenge.save();
  }
}
