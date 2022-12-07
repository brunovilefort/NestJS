import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';

import { ICategories } from './interfaces';
import { CreateCategorieDTO } from './dtos';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Categorie')
    private readonly categorieModel: Model<ICategories>,
  ) {}

  async create({
    categorie,
    description,
    events,
  }: CreateCategorieDTO): Promise<ICategories> {
    const existingCategorie = await this.categorieModel
      .findOne({ categorie })
      .exec();
    if (existingCategorie) {
      throw new BadRequestException(
        `Categorie: ${categorie} is already registered.`,
      );
    }
    const createdCategorie = new this.categorieModel(
      categorie,
      description,
      events,
    );
    return await createdCategorie.save();
  }

  async getAll(): Promise<Array<ICategories>> {
    return await this.categorieModel.find().exec();
  }

  async findCategorieById(categorie: string): Promise<ICategories> {
    const existingCategorie = await this.categorieModel
      .findOne({ categorie })
      .exec();
    if (!existingCategorie) {
      throw new NotImplementedException(
        `Categorie ${categorie} was not found!`,
      );
    }
    return existingCategorie;
  }
}
