import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(
    //'mongodb://localhost/taskdb'
    `mongodb://mongo:BUZLrIOxEjTLBuHpqVXVHgquWLbXWoma@monorail.proxy.rlwy.net:28201/taskdb?authSource=admin`,), TasksModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
