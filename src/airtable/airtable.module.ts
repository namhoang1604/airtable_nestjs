import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AirtableService } from './airtable.service';
import { AirtableDrawing } from './models/airtable-drawing.model';
import { AirtableModelModel } from './models/airtable-model-model.model';
import { AirtableModel } from './models/airtable-model.model';
import { AirtableServiceModel } from './models/airtable-service.model';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('airtable.baseUrl'),
        headers: {
          Authorization: 'Bearer ' + configService.get('airtable.apiKey'),
        },
        timeout: 7000,
        maxRedirects: 5,
      }),
      inject: [ConfigService],
    }),
    SequelizeModule.forFeature([
      AirtableModel,
      AirtableModelModel,
      AirtableDrawing,
      AirtableServiceModel,
    ]),
  ],
  providers: [AirtableService],
  exports: [AirtableService],
})
export class AirtableModule {}
