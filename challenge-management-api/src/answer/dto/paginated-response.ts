import { ObjectType } from '@nestjs/graphql';
import { Answer } from '../entities/answer.entity';
import { Paginated } from '../../utils/paginated-type';

export interface Pagination {
  total: number;
}

@ObjectType()
export class AnswerPaginatedResponse extends Paginated(Answer) {}
