import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import {
  CategoriesController,
  CategoriesService,
  CategorieSchema,
} from './index';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }]),
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
