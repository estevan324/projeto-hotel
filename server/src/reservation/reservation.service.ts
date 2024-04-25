import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Between, Not, Repository } from 'typeorm';
import { CreateReservationDTO } from './dtos/create-reservation.dto';
import { UpdateReservationDTO } from './dtos/update-reservation.dto';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
    private paginationService: PaginationService,
  ) {}

  private async exists(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    return reservation;
  }

  private async checkOutIsAfterCheckIn(checkIn: Date, checkOut: Date) {
    if (checkOut <= checkIn) {
      throw new BadRequestException(
        'A data de saída deve ser posterior à data de entrada',
      );
    }

    return true;
  }

  private async hasOverlappingDates(
    roomId: number,
    checkIn: Date,
    checkOut: Date,
    reservationId?: number,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: {
        roomId,
        checkIn: Between(checkIn, checkOut),
        checkOut: Between(checkIn, checkOut),
        id: reservationId ? Not(reservationId) : null,
      },
    });

    console.log(reservationId);

    if (reservation) {
      throw new BadRequestException(
        'Existe uma reserva para o quarto nesse período',
      );
    }

    return true;
  }

  async findAll(page?: number, limit?: number, roomId?: number) {
    return this.paginationService.paginate(
      this.reservationRepository,
      page,
      limit,
      { roomId },
      { ['checkIn']: 'DESC' },
    );
  }

  async findOne(id: number) {
    return this.exists(id);
  }

  async create(data: CreateReservationDTO) {
    await this.checkOutIsAfterCheckIn(data.checkIn, data.checkOut);
    await this.hasOverlappingDates(data.roomId, data.checkIn, data.checkOut);

    const reservation = this.reservationRepository.create(data);
    return this.reservationRepository.save(reservation);
  }

  async update(id: number, data: UpdateReservationDTO) {
    const room = await this.exists(id);

    await this.checkOutIsAfterCheckIn(data.checkIn, data.checkOut);
    await this.hasOverlappingDates(
      room.room.id,
      data.checkIn,
      data.checkOut,
      id,
    );

    this.reservationRepository.merge(room, data);

    return this.reservationRepository.save(room);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.reservationRepository.delete(id);
  }
}
