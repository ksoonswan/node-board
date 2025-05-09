import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class SearchCommentDto {
  @ApiProperty({ description: '게시물 ID' })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  boardId: number;

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
