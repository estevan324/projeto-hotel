import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionalIntPipe {
  transform(value: any) {
    return value ? parseInt(value) : value;
  }
}
