import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesModule, PlayersModule } from './index';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), PlayersModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
