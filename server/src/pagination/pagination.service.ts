import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class PaginationService {
  async paginate<T>(
    repository: Repository<T>,
    page: number = 1,
    limit: number = 10,
    where: any = {},
    order: any = {},
  ): Promise<{ rows: T[]; count: number }> {
    page = Math.max(1, page);
    limit = Math.max(1, limit);

    const [results, total] = await repository.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
      where,
      order,
    });

    return {
      count: total,
      rows: results,
    };
  }
}
