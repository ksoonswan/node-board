import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BoardEntity } from './board';

@Entity('comment')
export class CommentEntity extends BaseEntity {
  @Column({ type: 'text' })
  contents: string;

  @Column()
  author: string;

  @Column()
  boardId: number;

  @ManyToOne(() => BoardEntity, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board: BoardEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  parent?: CommentEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.parent)
  children: CommentEntity[];
}
