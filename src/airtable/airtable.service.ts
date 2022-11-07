import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  Observable,
  of,
  expand,
  takeWhile,
  bufferCount,
  from,
  mergeMap,
  catchError,
  map,
  lastValueFrom,
} from 'rxjs';
import { Sequelize } from 'sequelize-typescript';
import { AirtableDrawing } from './models/airtable-drawing.model';
import { AirtableModelModel } from './models/airtable-model-model.model';
import { AirtableModel } from './models/airtable-model.model';
import { AirtableServiceModel } from './models/airtable-service.model';

const numberOfValues = 1000;
const view = 'grid_view';

@Injectable()
export class AirtableService {
  constructor(
    private readonly httpService: HttpService,
    private sequelize: Sequelize,
    @InjectModel(AirtableModel)
    private readonly airtableModel: typeof AirtableModel,
    @InjectModel(AirtableModelModel)
    private readonly airtableModelModel: typeof AirtableModelModel,
    @InjectModel(AirtableDrawing)
    private readonly airtableDrawing: typeof AirtableDrawing,
    @InjectModel(AirtableServiceModel)
    private readonly airtableServiceModel: typeof AirtableServiceModel,
  ) {}

  async collectAllModels() {
    const entity = new AirtableModel();
    try {
      await this.sequelize.transaction(async (t) => {
        const source = this.getAllData(entity, this.getData).pipe(
          bufferCount(numberOfValues),
          mergeMap((data) => this.bulkCreateAirtableModel(t, data, entity)),
        );
        return await lastValueFrom(source);
      });
    } catch (err) {}
  }

  async collectAllModelModels() {
    const entity = new AirtableModelModel();
    try {
      await this.sequelize.transaction(async (t) => {
        const source = this.getAllData(entity, this.getData).pipe(
          bufferCount(numberOfValues),
          mergeMap((data) =>
            this.bulkCreateAirtableModelModel(t, data, entity),
          ),
        );
        return await lastValueFrom(source);
      });
    } catch (err) {}
  }

  async collectAllDrawings() {
    const entity = new AirtableDrawing();
    try {
      await this.sequelize.transaction(async (t) => {
        const source = this.getAllData(entity, this.getData).pipe(
          bufferCount(numberOfValues),
          mergeMap((data) => this.bulkCreateAirtableDrawing(t, data, entity)),
        );
        return await lastValueFrom(source);
      });
    } catch (err) {}
  }

  async collectAllServices() {
    const entity = new AirtableServiceModel();
    try {
      await this.sequelize.transaction(async (t) => {
        const source = this.getAllData(entity, this.getData).pipe(
          bufferCount(numberOfValues),
          mergeMap((data) => this.bulkCreateAirtableService(t, data, entity)),
        );
        return await lastValueFrom(source);
      });
    } catch (err) {}
  }

  private getAllData(
    entity,
    handle: (
      httpService: HttpService,
      entity: AirtableModel | AirtableModelModel,
      offset?: string,
    ) => Observable<any>,
  ): Observable<any> {
    return of({
      isCompleted: false,
      offset: null,
      records: [],
    }).pipe(
      expand((data) => {
        if (!data.isCompleted && (!!data.offset || data.records.length === 0)) {
          return handle(this.httpService, entity, data.offset);
        } else {
          return of({ ...data, isCompleted: true });
        }
      }),
      takeWhile((data) => !data.isCompleted),
      mergeMap((data) => data.records || []),
    );
  }

  private getData(
    httpService: HttpService,
    model: AirtableModel | AirtableModelModel,
    offset?: string,
  ): Observable<any> {
    return httpService
      .get(model.url, {
        params: { view, offset },
      })
      .pipe(map((data) => data.data));
  }

  private bulkCreateAirtableModel(
    transaction,
    data: Array<any>,
    entity: AirtableModel,
  ): Observable<Array<AirtableModel> | any> {
    const values = data.map((d) => entity.mapping(d));

    return from(
      this.airtableModel.bulkCreate(values, {
        returning: true,
        ignoreDuplicates: true,
        transaction,
      }),
    ).pipe(
      catchError((e) => {
        return e;
      }),
    );
  }

  private bulkCreateAirtableModelModel(
    transaction,
    data: Array<any>,
    entity: AirtableModelModel,
  ): Observable<Array<AirtableModelModel> | any> {
    const values = data.map((d) => entity.mapping(d));

    return from(
      this.airtableModelModel.bulkCreate(values, {
        returning: true,
        ignoreDuplicates: true,
        transaction,
      }),
    ).pipe(
      catchError((e) => {
        return e;
      }),
    );
  }

  private bulkCreateAirtableDrawing(
    transaction,
    data: Array<any>,
    entity: AirtableDrawing,
  ): Observable<Array<AirtableDrawing> | any> {
    const values = data.map((d) => entity.mapping(d));
    return from(
      this.airtableDrawing.bulkCreate(values, {
        returning: true,
        ignoreDuplicates: true,
        transaction,
      }),
    ).pipe(
      catchError((e) => {
        return e;
      }),
    );
  }

  private bulkCreateAirtableService(
    transaction,
    data: Array<any>,
    entity: AirtableServiceModel,
  ): Observable<Array<AirtableServiceModel> | any> {
    const values = data.map((d) => entity.mapping(d));

    return from(
      this.airtableServiceModel.bulkCreate(values, {
        returning: true,
        ignoreDuplicates: true,
        transaction,
      }),
    ).pipe(
      catchError((e) => {
        return e;
      }),
    );
  }
}
