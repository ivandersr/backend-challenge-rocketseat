import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { Answer } from './entities/answer.entity';
import { CreateAnswerInput } from './dto/create-answer.input';
import { ListAnswersArgs } from './dto/list-answers.args';
import { ChallengeService } from '../challenge/challenge.service';
import { AnswerPaginatedResponse } from './dto/paginated-response';

@Resolver(() => Answer)
export class AnswerResolver {
  constructor(
    private readonly answerService: AnswerService,
    private readonly challengeService: ChallengeService,
  ) {}

  @Mutation(() => Answer)
  answerChallenge(
    @Args('createAnswerInput') createAnswerInput: CreateAnswerInput,
  ) {
    return this.answerService.create(createAnswerInput);
  }

  @Query(() => AnswerPaginatedResponse, { name: 'answers' })
  findAll(@Args() args: ListAnswersArgs) {
    return this.answerService.findMany(args);
  }

  @ResolveField('challenge')
  challenge(@Parent() answer: Answer) {
    return answer.challengeId
      ? this.challengeService.findOne(answer.challengeId)
      : null;
  }
}
