import { Controller, Get } from '@nestjs/common';
import { DrawingsService } from './drawings.service';

@Controller('drawings')
export class DrawingsController {
  constructor(private readonly drawingsService: DrawingsService) {}

  @Get()
  findAll() {
    return this.drawingsService.findAll();
  }
}
