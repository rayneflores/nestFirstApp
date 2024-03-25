import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Task } from '../schemas/task.schema';
import { v4 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>){
  }

  findAll() {
    return this.taskModel.find();
  }

  async create(createTask: CreateTaskDto) {
    const newTask = new this.taskModel(createTask);
    return await newTask.save();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id);
  }

  async update(id: string, updateTask: UpdateTaskDto) {
    return await this.taskModel.findByIdAndUpdate(id, updateTask, {new: true});
  }

  async delete(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }
}
