import { PrismaService } from '../../../prisma/prisma.service';
import { AnswerRepository } from '../answer.repository';
import { CreateAnswerRepositoryInput } from '../../dto/create-answer.repo.input';
import { Answer } from '../../entities/answer.entity';
import { parseFilters } from '../../../utils/parse-filters';
import { UpdateAnswerRepositoryInput } from '../../dto/update-answer.repo.input';
import { Injectable } from '@nestjs/common';
import { ListAnswersRepositoryArgs } from '../../dto/List-answers.repo.args';
import { AnswerPaginatedResponse } from 'src/answer/dto/paginated-response';

@Injectable()
export class AnswerPrismaRepository implements AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateAnswerRepositoryInput): Promise<Answer> {
    const { status, repositoryUrl, challengeId, errorMessage } = input;
    return this.prisma.answer.create({
      data: {
        status,
        repositoryUrl,
        challengeId,
        errorMessage,
      },
    });
  }

  async findOne(id: string): Promise<Answer> {
    return this.prisma.answer.findUnique({
      where: { id },
    });
  }

  async findMany(
    args: ListAnswersRepositoryArgs,
  ): Promise<AnswerPaginatedResponse> {
    const { skip, take, challengeId, status, startDate, endDate } = args;

    const queryArgs = {
      skip,
      take,
      where: parseFilters([
        {
          field: 'challengeId',
          operator: 'equals',
          value: challengeId,
        },
        {
          field: 'status',
          operator: 'equals',
          value: status,
        },
        {
          field: 'createdAt',
          operator: 'gte',
          value: startDate,
        },
        {
          field: 'createdAt',
          operator: 'lte',
          value: endDate,
        },
      ]),
    };
    const [answers, count] = await this.prisma.$transaction([
      this.prisma.answer.findMany(queryArgs),
      this.prisma.answer.count({ where: queryArgs.where }),
    ]);

    return {
      total: count,
      data: answers,
    };
  }

  async update(input: UpdateAnswerRepositoryInput) {
    const { id, ...data } = input;
    return this.prisma.answer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    this.prisma.answer.delete({
      where: { id },
    });
  }
}
