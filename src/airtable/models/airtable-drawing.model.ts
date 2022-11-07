import { Column, DataType, Table } from 'sequelize-typescript';
import { Integration } from '../interfaces/integration.interface';
import { BaseModel } from './base.model';

@Table({ timestamps: true })
export class AirtableDrawing extends BaseModel implements Integration {
  @Column
  name: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  modelModel: string[];

  @Column
  createdTime: Date;

  url = 'drawings';

  mapping(data: any): any {
    return {
      id: data.id,
      createdTime: data.createdTime,
      name: data.fields.name,
      modelModel: data.fields.model_model,
    };
  }
}
