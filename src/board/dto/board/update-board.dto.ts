import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateBoardDto } from './create-board.dto';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(
  PickType(CreateBoardDto, ['title', 'contents']),
) {
  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
