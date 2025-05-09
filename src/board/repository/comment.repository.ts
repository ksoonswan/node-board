import { DataSource, Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment';
import { SearchCommentDto } from '../dto/comment/search-comment.dto';

export class CommentRepository extends Repository<CommentEntity> {
  constructor(dataSource: DataSource) {
    super(CommentEntity, dataSource.createEntityManager());
  }

  async findCommentByBoardId(dto: SearchCommentDto) {
    const { boardId, page = 1, limit = 10 } = dto;

    const [data, total] = await this.createQueryBuilder('comment')
      .leftJoinAndSelect('comment.children', 'children')
      .andWhere('comment.boardId = :boardId', { boardId: `${boardId}` })
      .andWhere('comment.parent IS NULL')
      .orderBy('comment.createdAt', 'ASC')
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return { data, total, page, limit };
  }
}
