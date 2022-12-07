import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePlayerDTO } from './dtos/create-player-dto';
import { IPlayer } from './interfaces/player.interface';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player')
    private readonly playerModel: Model<IPlayer>,
  ) {}

  async createPlayer({
    phone,
    email,
    name,
  }: CreatePlayerDTO): Promise<IPlayer> {
    const existingPlayer = await this.playerModel.findOne({ email }).exec();
    if (existingPlayer)
      throw new BadRequestException(
        `The player with email ${email} is already registered.`,
      );
    const createdPlayer = new this.playerModel({ phone, email, name });
    return await createdPlayer.save();
  }

  async updatePlayer(
    _id: string,
    { phone, email, name }: CreatePlayerDTO,
  ): Promise<void> {
    const existingPlayer = await this.playerModel.findOne({ _id }).exec();
    if (existingPlayer)
      throw new NotFoundException(
        `The player with the id: ${_id} was not found.`,
      );
    await this.playerModel
      .findOneAndUpdate({ _id }, { $set: { phone, email, name } })
      .exec();
  }

  async getAll(): Promise<IPlayer[]> {
    return await this.playerModel.find().exec();
  }

  async getByEmail(email: string): Promise<IPlayer> {
    const existingPlayer = await this.playerModel.findOne({ email }).exec();
    if (!existingPlayer)
      throw new NotFoundException(
        `The player with the email: ${email} was not found.`,
      );
    return existingPlayer;
  }

  async delete(email: string): Promise<any> {
    return await this.playerModel.deleteOne({ email }).exec();
  }
}
