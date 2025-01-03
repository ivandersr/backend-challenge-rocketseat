import { ObjectType } from '@nestjs/graphql';
import { Paginated } from '../../utils/paginated-type';
import { Challenge } from '../entities/challenge.entity';

export interface Pagination {
  total: number;
}

@ObjectType()
export class ChallengePaginatedResponse extends Paginated(Challenge) {}
