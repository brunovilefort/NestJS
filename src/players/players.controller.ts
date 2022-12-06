import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player-dto';
import { IPlayer } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async criarAtualizarJogador(
    @Body()
    player: CreatePlayerDTO,
  ) {
    await this.playersService.createAndUpdate(player);
  }

  @Get()
  async consultarJogadores(
    @Query('email') email: string,
  ): Promise<IPlayer[] | IPlayer> {
    return email
      ? this.playersService.getByEmail(email)
      : this.playersService.getAll();
  }

  @Delete()
  async deletarJogador(@Query('email') email: string): Promise<void> {
    this.playersService.delete(email);
  }
}
