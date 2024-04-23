export default interface Room {
  id?: number;
  number: number;
  type: string;
  pricePerNight: number;
  createdAt?: string;
  updatedAt?: string;
}
