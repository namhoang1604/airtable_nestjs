import { Column, DataType, Table } from 'sequelize-typescript';
import { Integration } from '../interfaces/integration.interface';
import { BaseModel } from './base.model';

@Table({ timestamps: true })
export class AirtableModel extends BaseModel implements Integration {
  @Column
  number: string;

  @Column
  description: string;

  @Column
  unit: string;

  @Column
  note: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  interchangeableWith: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  parents: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  children: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  services: string[];

  @Column
  createdTime: Date;

  url = 'models';

  mapping(data: any): any {
    return {
      id: data.id,
      createdTime: data.createdTime,
      number: data.fields.number,
      description: data.fields.description,
      unit: data.fields.unit,
      note: data.fields.note,
      interchangeableWith: data.fields.interchangeable_with,
      parents: data.fields.parents,
      children: data.fields.children,
      services: data.fields.services,
    };
  }
}
