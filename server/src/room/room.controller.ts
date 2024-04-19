import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDTO } from './dtos/create-room.dto';
import { UpdateRoomDTO } from './dtos/update-room.dto';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  async findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.roomService.findOne(id);
  }

  @Post()
  async create(@Body() room: CreateRoomDTO) {
    return this.roomService.create(room);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe)
    id: number,
    @Body() room: UpdateRoomDTO,
  ) {
    return this.roomService.update(id, room);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.delete(id);
  }
}
