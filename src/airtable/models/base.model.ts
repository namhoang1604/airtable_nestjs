import { Column, Model } from 'sequelize-typescript';

export abstract class BaseModel extends Model {
  @Column({ primaryKey: true })
  id: string;
}
