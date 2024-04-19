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

  @Column({ name: 'checkIn', nullable: false })
  checkIn: Date;

  @Column({ name: 'checkOut', nullable: false })
  checkOut: Date;

  @ManyToOne(() => RoomEntity, (room) => room.reservations)
  @JoinColumn()
  room: RoomEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
