import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationEntity } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDTO } from './dtos/create-reservation.dto';
import { UpdateReservationDTO } from './dtos/update-reservation.dto';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationEntity)
    private reservationRepository: Repository<ReservationEntity>,
  ) {}

  private async exists(id: number) {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['room'],
    });

    if (!reservation) throw new NotFoundException('Reservation not found');

    return reservation;
  }

  async findAll() {
    return this.reservationRepository.find();
  }

  async findOne(id: number) {
    return this.exists(id);
  }

  async create(data: CreateReservationDTO) {
    const reservation = this.reservationRepository.create(data);
    return this.reservationRepository.save(reservation);
  }

  async update(id: number, data: UpdateReservationDTO) {
    const room = await this.exists(id);

    this.reservationRepository.merge(room, data);

    return this.reservationRepository.save(room);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.reservationRepository.delete(id);
  }
}
