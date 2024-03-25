import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Can not find the Task: + ${id}`);
    return task;
  }

  @Post()
  async createTask(@Body() newTask: CreateTaskDto) {
    try {
      return await this.tasksService.create(newTask);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('The Task Title can not be duplicated');
      }
      throw error;
    }
  }

  @Patch(':id')
  async updateTask(@Param('id') id: string, @Body() updatedFields: UpdateTaskDto) {
    const task = await this.tasksService.update(id, updatedFields);
    if (!task) throw new NotFoundException(`Can not find the Task: + ${id}`);
    return task;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.delete(id);
    if (!task) throw new NotFoundException(`Can not find the Task: + ${id}`);
    return task;
  }
}
