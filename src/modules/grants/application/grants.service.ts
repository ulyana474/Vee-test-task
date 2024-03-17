import { Injectable } from '@nestjs/common';
import { GrantsRepo } from '../infrastructure/grants.repo';
import { GrantOpportunityCardDTO } from '../presentation/dtos/grant-opportunity-card.dto';
import { GrantStatus as GrantStatus } from '../core/grant-status.enum';

@Injectable()
export class GrantsService {
  constructor(private readonly grantsRepo: GrantsRepo) {}

  public async getNewGrantOpportunities(): Promise<GrantOpportunityCardDTO[]> {
    const matches = await this.grantsRepo.getGrantOpportunities({
      statuses: Object.values(GrantStatus),
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
        status: match.status,
      };
    });
  }

  public async updateGrantOpportunity(id: string, isApproved: boolean = true): Promise<void> {
    if (!isApproved) {
      await this.grantsRepo.softDeleteGrantOpportunityById(id)
    }
    await this.grantsRepo.updateGrantOpportunityStatus(
      id,
      GrantStatus.ACCEPTED,
    );
  }
}
