import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GrantsService } from '../application/grants.service';
import { GetGrantOpportunityCardsResponseDTO as GetGrantOpportunityCardsResponseDTO } from './dtos/get-grant-opportunity-cards-response.dto';
import { GetApprovedGrantOpportunitiesResponseDTO } from './dtos/get-approved-grant-opportunities.dto';

@Resolver()
export class GrantResolver {
  constructor(private readonly grantsService: GrantsService) {}

  @Query(() => GetGrantOpportunityCardsResponseDTO)
  public async getGrantOpportunityCards(): Promise<GetGrantOpportunityCardsResponseDTO> {
    const edges = await this.grantsService.getNewGrantOpportunities();
    
    return { edges };
  }

  @Query(() => GetApprovedGrantOpportunitiesResponseDTO)
  public async getApprovedGrantOpportunities(): Promise<GetApprovedGrantOpportunitiesResponseDTO> {
    const edges = await this.grantsService.getApprovedGrantOpportunities();

    return { edges };
  }

  @Mutation(() => Boolean)
  public async approveGrantOpportunity(
    @Args({ name: 'opportunityId', type: () => String }) opportunityId: string,
  ): Promise<boolean> {
    await this.grantsService.approveGrantOpportunity(opportunityId);

    return true;
  }

  @Mutation(() => Boolean)
  public async disapproveGrantOpportunity(
    @Args({ name: 'opportunityId', type: () => String }) opportunityId: string,
  ): Promise<boolean> {
    await this.grantsService.disapproveGrantOpportunity(opportunityId);

    return true;
  }
}
