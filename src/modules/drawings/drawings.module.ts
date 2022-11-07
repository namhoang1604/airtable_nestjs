import { Module } from '@nestjs/common';
import { DrawingsService } from './drawings.service';
import { DrawingsController } from './drawings.controller';
import { AirtableModule } from 'src/airtable/airtable.module';

@Module({
  imports: [AirtableModule],
  controllers: [DrawingsController],
  providers: [DrawingsService],
})
export class DrawingsModule {}
