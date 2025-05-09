import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CommentRepository } from '../repository/comment.repository';
import { SearchCommentDto } from '../dto/comment/search-comment.dto';
import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { BoardRepository } from '../repository/board.repository';
import { isNil, pick } from 'lodash';
import { AlertService } from './alert.service';

@Injectable()
export class CommentService {
  constructor(
    @Inject('CommentRepository')
    private readonly commentRepository: CommentRepository,
    @Inject('BoardRepository')
    private readonly boardRepository: BoardRepository,
    private readonly alertService: AlertService,
  ) {}

  async searchComments(dto: SearchCommentDto) {
    return this.commentRepository.findCommentByBoardId(dto);
  }

  async createComments(dto: CreateCommentDto) {
    const { boardId, contents, author, parentId } = dto;

    const board = await this.boardRepository.findOne({
      where: { id: +boardId },
    });
    if (!board) {
      throw new NotFoundException('게시물이 존재하지 않습니다.');
    }

    const comment = this.commentRepository.create({ board, contents, author });

    if (!isNil(parentId)) {
      const parentComment = await this.commentRepository.findOne({
        where: { id: +parentId },
      });
      if (!parentComment || parentComment.boardId !== boardId) {
        throw new NotFoundException('상위 댓글이 존재하지 않습니다.');
      }
      comment.parent = parentComment;
    }

    const savedComment = await this.commentRepository.save(comment);
    void this.alertService.checkAndSendAlert([comment.contents], {
      comment: pick(comment, ['id', 'contents']),
    });
    return savedComment;
  }
}
