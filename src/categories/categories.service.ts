import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';

import { ICategories } from './interfaces';
import { CreateCategorieDTO, UpdateCategorieDTO } from './dtos';
import { PlayersService } from '../players';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categorie')
    private readonly categorieModel: Model<ICategories>,
    private readonly playersService: PlayersService,
  ) {}

  async create({ categorie, description, events }: CreateCategorieDTO): Promise<ICategories> {
    const existingCategorie = await this.categorieModel.findOne({ categorie }).exec();
    if (existingCategorie) throw new BadRequestException(`Categorie: ${categorie} is already registered.`);
    const createdCategorie = new this.categorieModel(categorie, description, events);
    return await createdCategorie.save();
  }

  async getAll(): Promise<Array<ICategories>> {
    return await this.categorieModel.find().populate('players').exec();
  }

  async findCategorieById(categorie: string): Promise<ICategories> {
    const existingCategorie = await this.categorieModel.findOne({ categorie }).exec();
    if (!existingCategorie) throw new NotImplementedException(`Categorie ${categorie} was not found!`);
    return existingCategorie;
  }

  async updateCategorie(categorie: string, { description, events }: UpdateCategorieDTO): Promise<void> {
    const existingCategorie = await this.categorieModel.findOne({ categorie }).exec();
    if (!existingCategorie) throw new NotFoundException(`Categorie ${categorie} was not found.`);
    await this.categorieModel.findOneAndUpdate({ categorie }, { $set: { description, events } }).exec();
  }

  async checkPlayerCategory(idPlayer: any): Promise<ICategories> {
    const allPlayers = await this.playersService.getAll();
    const playersFilter = allPlayers.filter((player) => player._id === idPlayer);
    if (playersFilter.length === 0) throw new BadRequestException(`The id ${idPlayer} is not valid.`);
    return await this.categorieModel.findOne().where('players').in(idPlayer).exec();
  }

  async assignPlayerCategory(params: string[]): Promise<void> {
    const categorie = params['categorie'];
    const idPlayer = params['id-player'];
    const existingCategorie = await this.categorieModel.findOne({ categorie }).exec();
    const playerAlreadyRegisteredInCategory = await this.categorieModel
      .find({ categorie })
      .where('players')
      .in(idPlayer)
      .exec();
    await this.playersService.findPlayerById(idPlayer);
    if (playerAlreadyRegisteredInCategory.length > 0) {
      throw new BadRequestException(`Player ${idPlayer} is already registered in categorie ${categorie}.`);
    }
    if (!existingCategorie) throw new BadGatewayException(`Categorie ${categorie} was not found.`);
    existingCategorie.player.push(idPlayer);
    await this.categorieModel.findOneAndUpdate({ categorie }, { $set: existingCategorie }).exec();
  }
}
