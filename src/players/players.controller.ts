import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';

import { IPlayer } from './interfaces';
import { CreatePlayerDTO, UpdatePlayerDTO } from './dtos';
import { PlayersService } from './players.service';
import { ValidationParametersPipe } from '../common/pipes';

@Controller('api/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createPlayers(
    @Body()
    createPlayer: CreatePlayerDTO,
  ): Promise<IPlayer> {
    return await this.playersService.createPlayer(createPlayer);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updatePlayers(
    @Body()
    updatePlayer: UpdatePlayerDTO,
    @Param('_id', ValidationParametersPipe) _id: string,
  ): Promise<void> {
    await this.playersService.updatePlayer(_id, updatePlayer);
  }

  @Get()
  async findPlayers(): Promise<IPlayer[]> {
    return this.playersService.getAll();
  }

  @Get('/:_id')
  async findPlayerById(@Param('_id', ValidationParametersPipe) _id: string): Promise<IPlayer> {
    return await this.playersService.findPlayerById(_id);
  }

  @Delete('/:id')
  async deletePlayers(@Param('_id', ValidationParametersPipe) _id: string): Promise<void> {
    this.playersService.delete(_id);
  }
}
