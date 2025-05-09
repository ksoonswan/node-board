import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({
  imports: [
    // NOTE(swan): 기본 실행시에는 synchronize off.
    TypeOrmModule.forRoot({ ...typeOrmConfig, synchronize: false }),
    BoardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
