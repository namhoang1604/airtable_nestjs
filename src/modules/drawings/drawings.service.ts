import { Injectable } from '@nestjs/common';
import { AirtableDrawing } from 'src/airtable/models/airtable-drawing.model';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class DrawingsService {
  constructor(private sequelize: Sequelize) {}

  findAll(): Promise<AirtableDrawing[]> {
    return this.sequelize.query(
      `
        select
          *
        from
          "AirtableDrawings"
      `,
      {
        model: AirtableDrawing,
      },
    );
  }
}
