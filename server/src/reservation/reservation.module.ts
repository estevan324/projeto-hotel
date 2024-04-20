import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { RoomModule } from 'src/room/room.module';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity]), RoomModule],
  controllers: [ReservationController],
  providers: [ReservationService, PaginationService],
})
export class ReservationModule {}
