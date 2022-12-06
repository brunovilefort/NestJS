import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { JogadoresService } from './jogadores.service';

@Controller('api/jogadores')
export class JogadoresController {
  constructor(private readonly jogadoresService: JogadoresService) {}

  @Post()
  async criarAtualizarJogador(
    @Body()
    criarJogadorDto: CriarJogadorDto,
  ) {
    await this.jogadoresService.criarAtualizarJogador(criarJogadorDto);
  }
}
