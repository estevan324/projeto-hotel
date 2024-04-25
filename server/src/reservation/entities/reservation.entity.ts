import { RoomEntity } from 'src/room/entities/room.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('reservation')
export class ReservationEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({ name: 'guestName', nullable: false })
  guestName: string;

  @Column({ name: 'checkIn', nullable: false, type: 'date' })
  checkIn: Date;

  @Column({ name: 'checkOut', nullable: false, type: 'date' })
  checkOut: Date;

  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  @JoinColumn()
  room: RoomEntity;

  @Column({ name: 'roomId', nullable: false })
  roomId: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
