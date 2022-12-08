import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { PlayersService } from '../players/players.service';
import { CategoriesService } from '../categories/categories.service';
import { AssignChallengeDTO, CreateChallengeDTO, UpdateChallengeDTO } from './dtos';
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

  async createChallenge(createChallenges: CreateChallengeDTO): Promise<IChallenge> {
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

  async getAll(): Promise<Array<IChallenge>> {
    return await this.challengeModel.find().populate('requester').populate('players').populate('match').exec();
  }

  async checkPlayerChallenges(_id: any): Promise<Array<IChallenge>> {
    const allPlayers = await this.playersService.getAll();
    const playerFilter = allPlayers.filter((player) => player._id === _id);
    if (playerFilter.length === 0) throw new BadRequestException(`The id: ${_id} is not valid.`);
    return await this.challengeModel
      .find()
      .where('players')
      .in(_id)
      .populate('requester')
      .populate('players')
      .populate('match')
      .exec();
  }

  async updateChallenge(_id: string, updateChallenge: UpdateChallengeDTO): Promise<void> {
    const foundedChallenge = await this.challengeModel.findById(_id).exec();
    if (!foundedChallenge) throw new NotFoundException(`Challenge ${_id} was not found.`);
    if (updateChallenge.status) foundedChallenge.dateHourResponse = new Date();
    foundedChallenge.status = updateChallenge.status;
    foundedChallenge.dateHourChallenge = updateChallenge.dateHourChallenge;
    await this.challengeModel.findOneAndUpdate({ _id }, { $set: foundedChallenge }).exec();
  }

  async assignChallengeMatch(_id: string, challengeMatch: AssignChallengeDTO): Promise<void> {
    const foundedChallenge = await this.challengeModel.findById(_id).exec();
    if (!foundedChallenge) throw new BadRequestException(`Challenge ${_id} was not found.`);
    const playerFilter = foundedChallenge.players.filter((player) => player._id === challengeMatch.def);
    this.logger.log(`Founded challenge: ${foundedChallenge}`);
    this.logger.log(`Player filter: ${playerFilter}`);
    if (playerFilter.length === 0) throw new BadRequestException(`The winner player is not part of the challenge.`);
    const createdMatch = new this.matchModel(challengeMatch);
    createdMatch.categorie = foundedChallenge.categorie;
    createdMatch.players = foundedChallenge.players;
    const result = await createdMatch.save();
    foundedChallenge.status = ChallengeStatus.DONE;
    foundedChallenge.match = result._id;
    try {
      await this.challengeModel.findOneAndUpdate({ _id }, { $set: foundedChallenge }).exec();
    } catch (error) {
      await this.matchModel.deleteOne({ _id: result._id }).exec();
      throw new InternalServerErrorException();
    }
  }

  async deleteChallenge(_id: string): Promise<void> {
    const foundedChallenge = await this.challengeModel.findById(_id).exec();
    if (!foundedChallenge) throw new BadRequestException(`Challenge ${_id} has not been registered.`);
    foundedChallenge.status = ChallengeStatus.CANCELLED;
    await this.challengeModel.findOneAndUpdate({ _id }, { $set: foundedChallenge }).exec();
  }
}
