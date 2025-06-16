import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [HelloModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
