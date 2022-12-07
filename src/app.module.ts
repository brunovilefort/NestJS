import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesModule, PlayersModule, ChallengesModule } from './index';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), PlayersModule, CategoriesModule, ChallengesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
