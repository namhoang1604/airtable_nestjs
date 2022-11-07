import { Injectable } from '@nestjs/common';
import { AirtableServiceModel } from 'src/airtable/models/airtable-service.model';
import { Sequelize } from 'sequelize-typescript';
import { ModelsService } from '../models/models.service';

@Injectable()
export class ServicesService {
  constructor(
    private sequelize: Sequelize,
    private modelsService: ModelsService,
  ) {}

  async findAll(): Promise<any[]> {
    const services = await this.sequelize.query(
      `
        select
          *
        from
          "AirtableServiceModels" asm
      `,
      {
        model: AirtableServiceModel,
      },
    );
    const modelIds = [...new Set(services.flatMap((service) => service.model))];
    const models = await this.modelsService.findAllByIds(modelIds);
    return services.map((service) => {
      const relatedModelNumbers = models
        .filter((model) => service.model.includes(model.id))
        .map((model) => model.number);

      return { ...service.get({ plain: true }), relatedModelNumbers };
    });
  }
}
