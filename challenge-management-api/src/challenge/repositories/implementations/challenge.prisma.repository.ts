import { CreateChallengeInput } from '../../dto/create-challenge.input';
import { UpdateChallengeInput } from '../../dto/update-challenge.input';
import { Challenge } from '../../entities/challenge.entity';
import { PrismaService } from '../../../prisma/prisma.service';
import { parseFilters } from '../../../utils/parse-filters';
import { ChallengeRepository } from '../challenge.repository';
import { Injectable } from '@nestjs/common';
import { ListChallengesRepoArgs } from '../../dto/list-challenges.repo.args';
import { ChallengePaginatedResponse } from 'src/challenge/dto/paginated-response';

@Injectable()
export class ChallengePrismaRepository implements ChallengeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(input: CreateChallengeInput): Promise<Challenge> {
    return this.prisma.challenge.create({ data: input });
  }

  async findOne(id: string): Promise<Challenge> {
    return this.prisma.challenge.findUnique({ where: { id } });
  }

  async findByTitle(title: string): Promise<Challenge | null> {
    return this.prisma.challenge.findFirst({ where: { title } });
  }

  async findMany(
    args: ListChallengesRepoArgs,
  ): Promise<ChallengePaginatedResponse> {
    const { skip, take, title, description } = args;
    const queryArgs = {
      skip,
      take,
      where: parseFilters([
        {
          field: 'title',
          operator: 'contains',
          value: title,
        },
        {
          field: 'description',
          operator: 'contains',
          value: description,
        },
      ]),
    };
    const [challenges, count] = await this.prisma.$transaction([
      this.prisma.challenge.findMany(queryArgs),
      this.prisma.challenge.count({ where: queryArgs.where }),
    ]);

    return { total: count, data: challenges };
  }

  async update(input: UpdateChallengeInput): Promise<Challenge> {
    const { id, ...data } = input;
    return this.prisma.challenge.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    this.prisma.challenge.delete({ where: { id } });
  }
}
