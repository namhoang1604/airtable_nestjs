import { Column, DataType, Table } from 'sequelize-typescript';
import { Integration } from '../interfaces/integration.interface';
import { BaseModel } from './base.model';

@Table({ timestamps: true })
export class AirtableModelModel extends BaseModel implements Integration {
  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  number: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  description: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  parentNumber: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  parentDescription: string[];

  @Column
  quantity: number;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  dwgNo: string[];

  @Column
  dwgRefNo: string;

  @Column
  createdTime: Date;

  url = 'model_model';

  mapping(data: any): any {
    return {
      id: data.id,
      createdTime: data.createdTime,
      number: data.fields.number,
      description: data.fields.description,
      parentNumber: data.fields.parent_number,
      parentDescription: data.fields.parent_description,
      quantity: data.fields.quantity,
      dwgNo: data.fields.dwg_no,
      dwgRefNo: data.fields.dwg_ref_no,
    };
  }
}
