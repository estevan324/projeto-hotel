import { ReservationEntity } from 'src/reservation/entities/reservation.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('room')
export class RoomEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  id: number;

  @Column({ name: 'number', nullable: false })
  number: number;

  @Column({ name: 'type', nullable: false })
  type: string;

  @OneToMany(() => ReservationEntity, (reservation) => reservation.room)
  reservations: ReservationEntity[];

  @Column({ name: 'pricePerNight', nullable: false })
  pricePerNight: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
