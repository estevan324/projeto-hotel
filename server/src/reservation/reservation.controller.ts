import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDTO } from './dtos/create-reservation.dto';
import { UpdateReservationDTO } from './dtos/update-reservation.dto';
import { RoomService } from 'src/room/room.service';
import { OptionalIntPipe } from 'src/pipes/optional-int.pipe';

@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    private readonly roomService: RoomService,
  ) {}

  @Get()
  async findAll(
    @Query('page', OptionalIntPipe) page?: number,
    @Query('limit', OptionalIntPipe) limit?: number,
    @Query('roomId', OptionalIntPipe) roomId?: number,
  ) {
    return this.reservationService.findAll(page, limit, roomId);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.findOne(id);
  }

  @Post()
  async create(@Body() reservation: CreateReservationDTO) {
    await this.roomService.findOne(reservation.roomId);

    return this.reservationService.create(reservation);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() reservation: UpdateReservationDTO,
  ) {
    await this.roomService.findOne(reservation.roomId);

    return this.reservationService.update(id, reservation);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.reservationService.delete(id);
  }
}
