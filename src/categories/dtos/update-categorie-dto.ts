import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

import { Event } from '../interfaces';

export class UpdateCategorieDTO {
  @IsString()
  @IsOptional()
  description?: string;
  @IsArray()
  @ArrayMinSize(1)
  events: Array<Event>;
}
