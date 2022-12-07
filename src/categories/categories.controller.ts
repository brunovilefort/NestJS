import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateCategorieDTO } from './dtos';
import { ICategories } from './interfaces';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categorieService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategorie(
    @Body() categorie: CreateCategorieDTO,
  ): Promise<ICategories> {
    return await this.categorieService.create(categorie);
  }
}
