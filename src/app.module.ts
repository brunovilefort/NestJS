import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoriesModule, PlayersModule } from './index';
import { ChallengeModule } from './challenge/challenge.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGO_URI), PlayersModule, CategoriesModule, ChallengeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
