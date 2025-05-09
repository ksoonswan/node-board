import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteBoardDto {
  @ApiProperty({ description: '비밀번호' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
