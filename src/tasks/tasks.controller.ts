import { Controller, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async executeSync() {
    await this.tasksService.executeSync();
    return { message: 'Success' };
  }
}
