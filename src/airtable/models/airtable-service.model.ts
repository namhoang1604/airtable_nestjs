import { Column, DataType, Table } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ timestamps: true })
export class AirtableServiceModel extends BaseModel {
  @Column
  name: string;

  @Column({ type: DataType.TEXT })
  instructions: string;

  @Column
  condition: string;

  @Column
  recurring: boolean;

  @Column
  calendarInterval: number;

  @Column
  calendarIntervalUnit: string;

  @Column
  runningHoursInterval: number;

  @Column
  alternativeInterval: number;

  @Column
  alternativeIntervalDescription: string;

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  serviceGroup: string[];

  @Column({ type: DataType.ARRAY(DataType.STRING), defaultValue: [] })
  model: string[];

  @Column
  createdTime: Date;

  relatedModelNumbers: string[];

  url = 'services';

  mapping(data: any): any {
    return {
      id: data.id,
      createdTime: data.createdTime,
      name: data.fields.name,
      instructions: data.fields.instructions,
      condition: data.fields.condition,
      recurring: data.fields.recurring,
      calendarInterval: data.fields.calendar_interval,
      calendarIntervalUnit: data.fields.calendar_interval_unit,
      runningHoursInterval: data.fields.running_hours_interval,
      alternativeInterval: data.fields.alternative_interval,
      alternativeIntervalDescription:
        data.fields.alternative_interval_description,
      serviceGroup: data.fields.service_group,
      model: data.fields.model,
    };
  }
}
