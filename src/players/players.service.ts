import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createAndUpdate({
    phone,
    email,
    name,
  }: CreatePlayerDTO): Promise<void> {
    const existingPlayer = await this.playerModel.findOne({ email }).exec();
    existingPlayer
      ? await this.update({ phone, email, name })
      : await this.create({ phone, email, name });
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

  async delete(email: string): Promise<void> {
    const existingPlayer = await this.playerModel.findOne({ email }).exec();
    return await this.playerModel.remove(existingPlayer).exec();
  }

  private async create({
    phone,
    email,
    name,
  }: CreatePlayerDTO): Promise<IPlayer> {
    const createdPlayer = new this.playerModel({ phone, email, name });
    return await createdPlayer.save();
  }

  private async update({ email, name }: CreatePlayerDTO): Promise<IPlayer> {
    return await this.playerModel
      .findOneAndUpdate({ email }, { $set: { name } })
      .exec();
  }
}
