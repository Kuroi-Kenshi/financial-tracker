import { Module } from '@nestjs/common';
import { CounterpartService } from './counterpart.service';
import { CounterpartController } from './counterpart.controller';

@Module({
  controllers: [CounterpartController],
  providers: [CounterpartService],
})
export class CounterpartModule {}
