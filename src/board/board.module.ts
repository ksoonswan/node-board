import { Module } from '@nestjs/common';
import { BoardController } from './controller/board.controller';
import { CommentController } from './controller/comment.controller';
import { BoardService } from './service/board.service';
import { CommentService } from './service/comment.service';
import { DataSource } from 'typeorm';
import { BoardRepository } from './repository/board.repository';
import { CommentRepository } from './repository/comment.repository';
import { AlertService } from './service/alert.service';
import { AlertEntity } from './entities/alert';

@Module({
  controllers: [BoardController, CommentController],
  providers: [
    AlertService,
    BoardService,
    CommentService,
    {
      provide: 'AlertEntityRepository',
      useFactory: (dataSource: DataSource) =>
        dataSource.getRepository(AlertEntity),
      inject: [DataSource],
    },
    {
      provide: 'BoardRepository',
      useFactory: (dataSource: DataSource) => new BoardRepository(dataSource),
      inject: [DataSource],
    },
    {
      provide: 'CommentRepository',
      useFactory: (dataSource: DataSource) => new CommentRepository(dataSource),
      inject: [DataSource],
    },
  ],
  exports: ['BoardRepository', 'CommentRepository'],
})
export class BoardModule {}
