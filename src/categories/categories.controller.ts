import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateCategorieDTO } from './dtos';
import { ICategories } from './interfaces';
import { CategoriesService } from './categories.service';

@Controller('api/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategorie(
    @Body() categorie: CreateCategorieDTO,
  ): Promise<ICategories> {
    return await this.categoriesService.create(categorie);
  }

  @Get()
  async findCategories(): Promise<Array<ICategories>> {
    return await this.categoriesService.getAll();
  }

  @Get('/:categorie')
  async findCategorieById(
    @Param('categorie') categorie: string,
  ): Promise<ICategories> {
    return await this.categoriesService.findCategorieById(categorie);
  }
}
