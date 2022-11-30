import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateCodeDto {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  id: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  shortcode_uuid: string;

  @IsNotEmpty()
  @IsUrl()
  @MaxLength(1000)
  @ApiProperty()
  redirect_url: string;

  @IsBoolean()
  @IsEmpty()
  @IsOptional()
  @ApiPropertyOptional()
  active: boolean;
}
