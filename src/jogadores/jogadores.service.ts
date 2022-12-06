import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

import { v4 } from 'uuid';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[] = [];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.criar(criarJogadorDto);
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
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
}
