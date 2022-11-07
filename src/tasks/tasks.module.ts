import { Module } from '@nestjs/common';
import { AirtableModule } from 'src/airtable/airtable.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [AirtableModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
