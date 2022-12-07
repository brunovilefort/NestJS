import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategorieSchema } from './interfaces';
import { PlayersModule } from '../players/players.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Categorie', schema: CategorieSchema }]), PlayersModule],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
