import { Injectable } from '@nestjs/common';
import { GrantsRepo } from '../infrastructure/grants.repo';
import { GrantOpportunityCardDTO } from '../presentation/dtos/grant-opportunity-card.dto';
import { GrantStatus as GrantStatus } from '../core/grant-status.enum';
import { ApprovedGrantOpportunityDto } from '../presentation/dtos/approved-grant-opportunity.dto';

@Injectable()
export class GrantsService {
  constructor(private readonly grantsRepo: GrantsRepo) {}

  public async getNewGrantOpportunities(): Promise<GrantOpportunityCardDTO[]> {
    const matches = await this.grantsRepo.getGrantOpportunities({
      statuses: [GrantStatus.CREATED],
    });

    return matches.map((match) => {
      return {
        id: String(match._id),
        grantId: String(match.grant!._id),
        areas: match.grant!.areas,
        averageAmount: match.grant!.averageAmount,
        deadline: match.grant!.deadline,
        foundationName: match.grant!.foundation!.name,
        grantName: match.grant!.grantName,
        location: match.grant!.location,
      };
    });
  }

  public async getApprovedGrantOpportunities(): Promise<
    ApprovedGrantOpportunityDto[]
  > {
    const matches = await this.grantsRepo.getGrantOpportunities({
      statuses: Object.values(GrantStatus).filter(
        (status) => status !== GrantStatus.CREATED,
      ),
    });

    return matches.map((match) => {
      return {
        id: String(match._id),
        grantId: String(match.grant!._id),
        areas: match.grant!.areas,
        averageAmount: match.grant!.averageAmount,
        deadline: match.grant!.deadline,
        foundationName: match.grant!.foundation!.name,
        grantName: match.grant!.grantName,
        location: match.grant!.location,
        matchDate: match.matchDate,
        status: match.status,
      };
    });
  }

  public async approveGrantOpportunity(id: string): Promise<void> {
    await this.grantsRepo.updateGrantOpportunityStatus(
      id,
      GrantStatus.ACCEPTED,
    );
  }

  public async disapproveGrantOpportunity(id: string): Promise<void> {
    await this.grantsRepo.softDeleteGrantOpportunityById(id);
  }
}
