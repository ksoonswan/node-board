import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { CommentEntity } from './comment';
import { KeywordEntity } from './keyword';

@Entity('board')
export class BoardEntity extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'text' })
  contents: string;

  @Column()
  author: string;

  @Column()
  password: string;

  @OneToMany(() => CommentEntity, (comment) => comment.board, { cascade: true })
  comments: CommentEntity[];

  @ManyToMany(() => KeywordEntity, (keyword) => keyword.boards, {
    cascade: true,
  })
  @JoinTable({
    name: 'boardKeywords',
    joinColumn: {
      name: 'boardId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'keywordId',
      referencedColumnName: 'id',
    },
  })
  keywords: KeywordEntity[];
}
