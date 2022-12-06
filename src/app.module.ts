import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadoresModule } from './jogadores/jogadores.module';

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useNewUrlParse: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
