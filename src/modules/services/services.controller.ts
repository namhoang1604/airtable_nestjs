import { Controller, Get } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly drawingsService: ServicesService) {}

  @Get()
  findAll() {
    return this.drawingsService.findAll();
  }
}
