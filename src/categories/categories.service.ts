import { Model } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

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
}
