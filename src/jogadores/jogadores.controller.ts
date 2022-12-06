import { Controller, Post } from '@nestjs/common';

@Controller('api/jogadores')
export class JogadoresController {
  @Post()
  async criarAtualizarJogadores() {
    return JSON.stringify({ nome: 'Diego' });
  }
}
