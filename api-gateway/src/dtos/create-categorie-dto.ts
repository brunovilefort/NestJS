import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';

import { Event } from '../interfaces';

export class CreateCategorieDTO {
  @IsString()
  @IsNotEmpty()
  readonly categorie: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
