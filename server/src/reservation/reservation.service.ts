import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Between, Repository } from 'typeorm';
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
        'Check-out date must be after check-in date',
      );
    }

    return true;
  }

  private async hasOverlappingDates(
    roomId: number,
    checkIn: Date,
    checkOut: Date,
  ) {
    const reservation = await this.reservationRepository.findOne({
      where: {
        roomId,
        checkIn: Between(checkIn, checkOut),
      },
    });

    if (reservation) {
      throw new BadRequestException(
        'Reservation dates overlap with another reservation',
      );
    }

    return true;
  }

  async findAll(page?: number, limit?: number) {
    return this.paginationService.paginate(
      this.reservationRepository,
      page,
      limit,
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
    await this.hasOverlappingDates(room.room.id, data.checkIn, data.checkOut);

    this.reservationRepository.merge(room, data);

    return this.reservationRepository.save(room);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.reservationRepository.delete(id);
  }
}
