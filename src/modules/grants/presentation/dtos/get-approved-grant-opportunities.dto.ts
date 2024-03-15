import { Field, ObjectType } from '@nestjs/graphql';
import { ApprovedGrantOpportunityDto } from './approved-grant-opportunity.dto';

@ObjectType('GetApprovedGrantOpportunitiesResponse')
export class GetApprovedGrantOpportunitiesResponseDTO {
  @Field(() => [ApprovedGrantOpportunityDto])
  edges: ApprovedGrantOpportunityDto[];
}
