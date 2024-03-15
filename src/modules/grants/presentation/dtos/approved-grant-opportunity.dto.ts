import { Field, ObjectType, Float } from '@nestjs/graphql';

@ObjectType('Grant')
export class ApprovedGrantOpportunityDto {
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

  @Field(() => Date)
  matchDate: Date;

  @Field()
  location: string;

  @Field()
  status: string;

  @Field(() => [String])
  areas: string[];
}
