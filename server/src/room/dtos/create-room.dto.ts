import { IsNumber, IsString, Min } from 'class-validator';

export class CreateRoomDTO {
  @IsNumber()
  @Min(1)
  number: number;

  @IsString()
  type: string;

  @IsNumber()
  @Min(1)
  pricePerNight: number;
}
