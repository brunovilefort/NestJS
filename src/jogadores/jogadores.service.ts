import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {
  private jogadores: Jogador[];
  private readonly logger = new Logger(JogadoresService.name);

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    this.logger.log(`criar jogador dto: ${criarJogadorDto}`);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { phone, email, name } = criarJogadorDto;
    const jogador: Jogador = {
      id: '',
      phone,
      email,
      name,
    };
  }
}
