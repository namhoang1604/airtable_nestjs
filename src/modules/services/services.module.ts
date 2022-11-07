import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { AirtableModule } from 'src/airtable/airtable.module';
import { ModelsModule } from '../models/models.module';

@Module({
  imports: [AirtableModule, ModelsModule],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
