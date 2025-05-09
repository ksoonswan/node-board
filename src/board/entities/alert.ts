import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { KeywordEntity } from './keyword';

@Entity('alert')
export class AlertEntity extends BaseEntity {
  @Column()
  author: string;

  @ManyToMany(() => KeywordEntity, (keyword) => keyword.alerts, {
    cascade: true,
  })
  @JoinTable({
    name: 'alertKeywords',
    joinColumn: {
      name: 'alertId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'keywordId',
      referencedColumnName: 'id',
    },
  })
  keywords: KeywordEntity[];
}
