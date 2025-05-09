import { DataSource, Repository } from 'typeorm';
import { BoardEntity } from '../entities/board';
import { SearchBoardDto } from '../dto/board/search-board.dto';

export class BoardRepository extends Repository<BoardEntity> {
  constructor(dataSource: DataSource) {
    super(BoardEntity, dataSource.createEntityManager());
  }

  async findByTitleOrAuthor(dto: SearchBoardDto) {
    const { title, author, page = 1, limit = 10 } = dto;

    const query = this.createQueryBuilder('board');
    if (title) {
      query.andWhere('board.title LIKE :title', { title: `%${title}%` });
    }
    if (author) {
      query.andWhere('board.author LIKE :author', { author: `%${author}%` });
    }
    query.skip((page - 1) * limit).take(limit);

    const [data, total] = await query.getManyAndCount();
    return { data, total, page, limit };
  }
}
