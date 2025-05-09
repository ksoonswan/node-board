import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchBoardDto {
  @ApiPropertyOptional({ description: '제목' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({ description: '작성자' })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiPropertyOptional({ description: 'page' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiPropertyOptional({ description: 'limit' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  limit?: number;
}
