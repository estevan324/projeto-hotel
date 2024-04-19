import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomEntity } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDTO } from './dtos/create-room.dto';
import { UpdateRoomDTO } from './dtos/update-room.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(RoomEntity)
    private roomService: Repository<RoomEntity>,
  ) {}

  private async exists(id: number) {
    const room = await this.roomService.findOne({ where: { id } });

    if (!room) throw new NotFoundException('Room not found');

    return room;
  }

  async findAll() {
    return this.roomService.find();
  }

  async findOne(id: number) {
    return this.exists(id);
  }

  async create(data: CreateRoomDTO) {
    const room = this.roomService.create(data);

    return this.roomService.save(room);
  }

  async update(id: number, data: UpdateRoomDTO) {
    const room = await this.exists(id);

    this.roomService.merge(room, data);

    return this.roomService.save(room);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.roomService.delete(id);
  }
}
