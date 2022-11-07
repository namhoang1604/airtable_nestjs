import { Controller, Get, Query, ParseArrayPipe } from '@nestjs/common';
import { ModelsService } from './models.service';

@Controller('models')
export class ModelsController {
  constructor(private readonly modelsService: ModelsService) {}

  @Get()
  findAll(
    @Query(
      'parentNumbers',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    parentNumbers?: string[] | null,
  ) {
    return this.modelsService.findAll(parentNumbers);
  }

  @Get('/get_by_model_model_ids')
  findAllByModelModelIds(
    @Query(
      'modelModelIds',
      new ParseArrayPipe({ items: String, separator: ',', optional: true }),
    )
    modelModelIds?: string[] | null,
  ) {
    return this.modelsService.findAllByModelModelIds(modelModelIds);
  }
}
