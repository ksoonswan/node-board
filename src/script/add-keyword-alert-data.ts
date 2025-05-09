// src/scripts/seed-keywords.ts
import { AlertEntity } from 'src/board/entities/alert';
import { KeywordEntity } from 'src/board/entities/keyword';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { DataSource } from 'typeorm';

const AppDataSource = new DataSource(typeOrmConfig);

const run = async () => {
  console.log(
    'alertKeywords UNIQUE 제약조건 및 keyword, alert 관련 데이터 추가 시작',
  );
  await AppDataSource.initialize();

  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const [isAlready] = await queryRunner.query(`
      SELECT CONSTRAINT_NAME
      FROM INFORMATION_SCHEMA.TABLE_CONSTRAINTS
      WHERE TABLE_SCHEMA = DATABASE()
        AND TABLE_NAME = 'alertKeywords'
        AND CONSTRAINT_TYPE = 'UNIQUE'
        AND CONSTRAINT_NAME = 'uq_alert_keywords'
    `);

  if (!isAlready) {
    console.log('alertKeywords (alertId, keywordId) UNIQUE 제약조건 추가');
    await queryRunner.query(`
        ALTER TABLE alertKeywords
        ADD CONSTRAINT uq_alert_keywords UNIQUE (alertId, keywordId)
      `);
  } else {
    console.log('alertKeywords (alertId, keywordId) UNIQUE 제약조건 이미 존재');
  }

  const alertRepository = AppDataSource.getRepository(AlertEntity);
  const keywordRepository = AppDataSource.getRepository(KeywordEntity);

  const keyword = keywordRepository.create({ word: 'wanted' });
  const savedKeyword = await keywordRepository.save(keyword);

  const alert = alertRepository.create({
    author: 'swan',
    keywords: [savedKeyword],
  });
  await alertRepository.save(alert);

  console.log('keyword, alert 관련 데이터 추가 완료');
  await AppDataSource.destroy();
};

run().catch((err) => {
  console.error(
    'alertKeywords UNIQUE 제약조건 및 keyword, alert 관련 데이터 추가 실패',
    err,
  );
  process.exit(1);
});
