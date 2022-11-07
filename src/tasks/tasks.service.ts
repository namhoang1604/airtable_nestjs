import { Injectable, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { AirtableService } from 'src/airtable/airtable.service';

const interval = 24 * 60 * 60 * 1000;
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(private readonly airtableService: AirtableService) {}

  @Interval(interval)
  handleInterval() {
    this.executeSync();
    this.logger.debug('Called interval');
  }

  async executeSync() {
    await this.airtableService.collectAllModels();
    await this.airtableService.collectAllModelModels();
    await this.airtableService.collectAllDrawings();
    await this.airtableService.collectAllServices();
  }
}
