import { Body, Controller, Post } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';

@Controller('api/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogadores(
    @Body()
    criarJogadorDto: CriarJogadorDto,
  ) {
    const { email } = criarJogadorDto;
    return JSON.stringify(`{ "email": ${email} }`);
  }
}
