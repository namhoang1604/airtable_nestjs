import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './configuration';
import { routes } from './routes';
import { TasksModule } from './tasks/tasks.module';
import { ModelsModule } from './modules/models/models.module';
import { AirtableModule } from './airtable/airtable.module';
import { DrawingsModule } from './modules/drawings/drawings.module';
import { ServicesModule } from './modules/services/services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          uri: configService.get('database.uri'),
          autoLoadModels: true,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ScheduleModule.forRoot(),
    RouterModule.register(routes),
    TasksModule,
    AirtableModule,
    ModelsModule,
    DrawingsModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
