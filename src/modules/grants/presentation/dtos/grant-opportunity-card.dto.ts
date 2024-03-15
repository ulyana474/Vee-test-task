import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('GrantOpportunityCard')
export class GrantOpportunityCardDTO {
  @Field()
  id: string;

  @Field()
  grantId: string;

  @Field()
  foundationName: string;

  @Field()
  grantName: string;

  @Field(() => Float)
  averageAmount: number;

  @Field(() => Date)
  deadline: Date;

  @Field()
  location: string;

  @Field(() => [String])
  areas: string[];
}
