import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AlertEntity } from '../entities/alert';
import { AlertSource, sendAlert } from 'src/common/util/alert.util';
@Injectable()
export class AlertService {
  constructor(
    @Inject('AlertEntityRepository')
    private readonly alertRepository: Repository<AlertEntity>,
  ) {}

  async checkAndSendAlert(contents: string[], source: AlertSource) {
    try {
      const alerts = await this.alertRepository.find({
        relations: ['keywords'],
      });
      for (const alert of alerts) {
        for (const keyword of alert.keywords) {
          if (contents.find((s) => s.includes(keyword.word))) {
            sendAlert(alert.author, keyword.word, source);
          }
        }
      }
    } catch (err: unknown) {
      console.error({
        msg: '예상치 못한 오류가 발생했습니다.',
        method: 'checkAndSendAlert',
        err,
      });
    }
  }
}
