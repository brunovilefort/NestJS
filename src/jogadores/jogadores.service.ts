import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { v4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  constructor(
    @InjectModel('Jogador')
    private readonly jogadorModel: Model<Jogador>,
  ) {}

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto;
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    return jogadorEncontrado
      ? await this.atualizar(jogadorEncontrado, criarJogadorDto)
      : await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
  }

  async consultartJogadortesPorEmail(email: string): Promise<Jogador> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    if (!jogadorEncontrado)
      throw new NotFoundException(
        `Jogador com o e-mail ${email} não foi encontrado.`,
      );
    return jogadorEncontrado;
  }

  async deletarJogador(email: string): Promise<void> {
    const jogadorEncontrado = await this.jogadores.find(
      (jogador) => jogador.email === email,
    );
    this.jogadores = this.jogadores.filter(
      (jogador) => jogador.email !== jogadorEncontrado.email,
    );
  }

  private async criar(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { phone, email, name } = criarJogadorDto;
    const jogador: Jogador = {
      _id: v4(),
      phone,
      email,
      name,
      ranking: 'A',
      positionRanking: 2,
      urlPayer: 'www.google.com.br/photo.jpg',
    };
    this.logger.log(`criar jogador dto: ${JSON.stringify(jogador)}`);
    this.jogadores.push(jogador);
  }

  private atualizar(
    jogadorEncontrado: Jogador,
    criarJogadorDto: CriarJogadorDto,
  ): void {
    const { name } = criarJogadorDto;
    jogadorEncontrado.name = name;
  }
}
