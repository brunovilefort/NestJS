import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { IPlayer } from './interfaces';
import { CreatePlayerDTO, UpdatePlayerDTO } from './dtos';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<IPlayer>,
  ) {}

  async createPlayer({ phone, email, name }: CreatePlayerDTO): Promise<IPlayer> {
    const existingPlayer = await this.playerModel.findOne({ email }).exec();
    if (existingPlayer) throw new BadRequestException(`The player with email ${email} is already registered.`);
    const createdPlayer = new this.playerModel({ phone, email, name });
    return await createdPlayer.save();
  }

  async updatePlayer(_id: string, { phone, name }: UpdatePlayerDTO): Promise<void> {
    const existingPlayer = await this.playerModel.findOne({ _id }).exec();
    if (existingPlayer) throw new NotFoundException(`The player with the id: ${_id} was not found.`);
    await this.playerModel.findOneAndUpdate({ _id }, { $set: { phone, name } }).exec();
  }

  async getAll(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  async findPlayerById(_id: string): Promise<IPlayer> {
    const existingPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!existingPlayer) throw new NotFoundException(`The player with the id: ${_id} was not found.`);
    return existingPlayer;
  }

  async delete(_id: string): Promise<any> {
    const existingPlayer = await this.playerModel.findOne({ _id }).exec();
    if (!existingPlayer) throw new NotFoundException(`The player with the id: ${_id} was not found.`);
    return await this.playerModel.deleteOne({ _id }).exec();
  }
}
