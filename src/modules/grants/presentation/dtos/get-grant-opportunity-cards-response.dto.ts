import { Field, ObjectType } from '@nestjs/graphql';
import { GrantOpportunityCardDTO } from './grant-opportunity-card.dto';

@ObjectType('GetGrantOpportunityCardsResponse')
export class GetGrantOpportunityCardsResponseDTO {
  @Field(() => [GrantOpportunityCardDTO])
  edges: GrantOpportunityCardDTO[];
}
