import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, ManyToMany } from 'typeorm';
import { BoardEntity } from './board';
import { AlertEntity } from './alert';

@Entity('keyword')
export class KeywordEntity extends BaseEntity {
  @Column({ unique: true })
  word: string;

  @ManyToMany(() => BoardEntity, (board) => board.keywords)
  boards: BoardEntity[];

  @ManyToMany(() => AlertEntity, (alert) => alert.keywords)
  alerts: AlertEntity[];
}
