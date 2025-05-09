import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ description: '게시물 ID' })
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  boardId: number;

  @ApiProperty({ description: '내용' })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({ description: '작성자' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiPropertyOptional({ description: '상위 댓글 ID', nullable: true })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  parentId?: number;
}
