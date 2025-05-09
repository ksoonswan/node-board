import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateBoardDto } from '../dto/board/create-board.dto';
import { UpdateBoardDto } from '../dto/board/update-board.dto';
import { BoardService } from '../service/board.service';
import { SearchBoardDto } from '../dto/board/search-board.dto';
import { DeleteBoardDto } from '../dto/board/delete-board.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BoardEntity } from '../entities/board';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated.decorator';

@ApiTags('Board')
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  @ApiOperation({ summary: '게시글 목록' })
  @ApiPaginatedResponse(BoardEntity)
  searchBoards(@Query() dto: SearchBoardDto) {
    return this.boardService.searchBoards(dto);
  }

  @Post()
  @ApiOperation({ summary: '게시글 작성' })
  createBoard(@Body() dto: CreateBoardDto) {
    return this.boardService.createBoard(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '게시글 수정' })
  updateBoard(@Param('id') id: string, @Body() dto: UpdateBoardDto) {
    return this.boardService.updateBoard(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '게시글 삭제' })
  deleteBoard(@Param('id') id: string, @Body() dto: DeleteBoardDto) {
    return this.boardService.deleteBoard(+id, dto);
  }
}
