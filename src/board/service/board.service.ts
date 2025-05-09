import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { BoardRepository } from '../repository/board.repository';
import { SearchBoardDto } from '../dto/board/search-board.dto';
import { CreateBoardDto } from '../dto/board/create-board.dto';
import { UpdateBoardDto } from '../dto/board/update-board.dto';
import { DeleteBoardDto } from '../dto/board/delete-board.dto';
import { AlertService } from './alert.service';
import { pick } from 'lodash';

@Injectable()
export class BoardService {
  constructor(
    @Inject('BoardRepository')
    private readonly boardRepository: BoardRepository,
    private readonly alertService: AlertService,
  ) {}

  async searchBoards(dto: SearchBoardDto) {
    return this.boardRepository.findByTitleOrAuthor(dto);
  }

  async createBoard(dto: CreateBoardDto) {
    const board = this.boardRepository.create(dto);
    const savedBoard = await this.boardRepository.save(board);
    void this.alertService.checkAndSendAlert([board.title, board.contents], {
      board: pick(board, ['id', 'title', 'contents']),
    });
    return savedBoard;
  }

  async findBoardAndCheckPassword(id: number, password: string) {
    const board = await this.boardRepository.findOne({ where: { id } });
    if (!board) {
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }
    if (board.password !== password) {
      throw new UnauthorizedException('게시글 비밀번호가 일치하지 않습니다.');
    }
    return board;
  }

  async updateBoard(id: number, dto: UpdateBoardDto) {
    const board = await this.findBoardAndCheckPassword(id, dto.password);
    Object.assign(board, {
      title: dto.title || board.title,
      contents: dto.contents || board.contents,
    });
    return this.boardRepository.save(board);
  }

  async deleteBoard(id: number, dto: DeleteBoardDto) {
    const board = await this.findBoardAndCheckPassword(id, dto.password);
    await this.boardRepository.delete(board.id);
    return board;
  }
}
