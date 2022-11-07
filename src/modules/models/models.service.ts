import { Injectable } from '@nestjs/common';
import { AirtableModel } from 'src/airtable/models/airtable-model.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class ModelsService {
  constructor(private sequelize: Sequelize) {}

  findAll(parentNumber: string[]): Promise<AirtableModel[]> {
    if (parentNumber) {
      return this.getByParentNumbers(parentNumber);
    }
    return this.getRoot();
  }

  private async getByParentNumbers(parentNumbers): Promise<AirtableModel[]> {
    return this.sequelize.query(
      `
        select
          *
        from
          "AirtableModels" am
        where am.parents::text[] && array[:parentNumbers]::text[]
      `,
      {
        replacements: { parentNumbers },
        model: AirtableModel,
      },
    );
  }

  private async getRoot(): Promise<AirtableModel[]> {
    return this.sequelize.query(
      `
        select
          *
        from
          "AirtableModels" am
        where am.parents = '{}'
      `,
      {
        model: AirtableModel,
      },
    );
  }

  findAllByModelModelIds(modelModelIds: string[]): Promise<AirtableModel[]> {
    return this.sequelize.query(
      `
        select
          am.*
        from
          "AirtableModels" am
        join 
          "AirtableModelModels" amm on am.id = any(amm.number)
        where amm.id::text = any(array[:modelModelIds]::text[])
      `,
      {
        replacements: { modelModelIds },
        model: AirtableModel,
      },
    );
  }

  findAllByIds(ids: string[]): Promise<AirtableModel[]> {
    return this.sequelize.query(
      `
        select
          *
        from
          "AirtableModels" am
        where am.id::text = any(array[:ids]::text[])
      `,
      {
        replacements: { ids },
        model: AirtableModel,
      },
    );
  }
}
