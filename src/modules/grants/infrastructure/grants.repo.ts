import { Injectable } from '@nestjs/common';
import { FilterQuery, Model, Types } from 'mongoose';
import { GrantModel } from './models/grant.model';
import { InjectModel } from '@nestjs/mongoose';
import { GrantOpportunity } from './models/grant-opportunity.model';
import { GrantStatus } from '../core/grant-status.enum';

@Injectable()
export class GrantsRepo {
  constructor(
    @InjectModel(GrantModel.name)
    private readonly grantModel: Model<GrantModel>,
    @InjectModel(GrantOpportunity.name)
    private readonly matchModel: Model<GrantOpportunity>,
  ) {}

  public async updateGrantOpportunityStatus(id: string, status: GrantStatus) {
    await this.matchModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { status } },
    );
  }

  public async softDeleteGrantOpportunityById(id: string) {
    await this.matchModel.updateOne(
      { _id: new Types.ObjectId(id) },
      { $set: { deleted: true } },
    );
  }

  public async getGrantOpportunities({
    statuses,
  }: {
    statuses?: GrantStatus[];
  }): Promise<GrantOpportunity[]> {
    const filter: FilterQuery<GrantOpportunity> = { deleted: false };

    if (statuses) {
      filter.status = { $in: statuses };
    }

    const matches = await this.matchModel.aggregate([
      {
        $match: filter,
      },
      {
        $lookup: {
          from: 'grant',
          localField: 'grantId',
          foreignField: '_id',
          as: 'grant',
        },
      },
      {
        $unwind: '$grant',
      },
      {
        $lookup: {
          from: 'foundation',
          localField: 'grant.foundationId',
          foreignField: '_id',
          as: 'grant.foundation',
        },
      },
      {
        $unwind: '$grant.foundation',
      },
    ]);

    return matches;
  }
}
