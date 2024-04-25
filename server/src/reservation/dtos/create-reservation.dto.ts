import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateReservationDTO {
  @IsString()
  guestName: string;

  @IsDateString()
  checkIn: Date;

  @IsDateString()
  checkOut: Date;

  @IsNumber()
  roomId: number;
}
