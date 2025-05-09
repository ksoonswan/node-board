import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoardDto {
  @ApiProperty({ description: '제목' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: '내용' })
  @IsNotEmpty()
  @IsString()
  contents: string;

  @ApiProperty({ description: '작성자' })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
