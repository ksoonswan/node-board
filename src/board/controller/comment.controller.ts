import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { SearchCommentDto } from '../dto/comment/search-comment.dto';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentEntity } from '../entities/comment';
import { ApiPaginatedResponse } from 'src/common/decorators/paginated.decorator';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  @ApiOperation({ summary: '댓글 목록' })
  @ApiPaginatedResponse(CommentEntity)
  searchComments(@Query() dto: SearchCommentDto) {
    return this.commentService.searchComments(dto);
  }

  @Post()
  @ApiOperation({ summary: '댓글 작성' })
  createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComments(dto);
  }
}
