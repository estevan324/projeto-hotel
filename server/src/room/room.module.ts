import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { RoomEntity } from './entities/room.entity';
import { PaginationService } from '../pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoomEntity])],
  controllers: [RoomController],
  providers: [RoomService, PaginationService],
  exports: [RoomService],
})
export class RoomModule {}
