import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { DatabaseProviders } from './database.providers';

@Module({
  providers: [...DatabaseProviders],
  exports: [...DatabaseProviders],
})
export class DatabaseModule { }
