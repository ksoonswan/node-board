import { AlertEntity } from 'src/board/entities/alert';
import { BoardEntity } from 'src/board/entities/board';
import { CommentEntity } from 'src/board/entities/comment';
import { KeywordEntity } from 'src/board/entities/keyword';
import { DataSourceOptions } from 'typeorm';

export const typeOrmConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'admin',
  password: '1234', // TODO(swan): 마스킹 필요.
  database: 'board',
  entities: [BoardEntity, CommentEntity, AlertEntity, KeywordEntity],
  synchronize: true, // TODO(swan): 환경별 분기처리 필요.
  logging: true,
};
