import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GrantsService } from '../application/grants.service';
import { GetGrantOpportunityCardsResponseDTO as GetGrantOpportunityCardsResponseDTO } from './dtos/get-grant-opportunity-cards-response.dto';

@Resolver()
export class GrantResolver {
  constructor(private readonly grantsService: GrantsService) {}

  @Query(() => GetGrantOpportunityCardsResponseDTO)
  public async getGrantOpportunityCards(): Promise<GetGrantOpportunityCardsResponseDTO> {
    const edges = await this.grantsService.getNewGrantOpportunities();

    return { edges };
  }

  @Mutation(() => Boolean)
  public async updateGrantOpportunity(
    @Args({ name: 'opportunityId', type: () => String }) opportunityId: string,
    @Args({ name: 'isApproved', type: () => Boolean}) isApproved: boolean
  ): Promise<boolean> {
    await this.grantsService.updateGrantOpportunity(opportunityId, isApproved);

    return true;
  }

}
