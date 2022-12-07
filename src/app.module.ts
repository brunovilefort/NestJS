import 'dotenv/config';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
