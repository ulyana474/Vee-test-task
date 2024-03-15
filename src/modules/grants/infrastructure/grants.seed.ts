import { Injectable, OnModuleInit } from '@nestjs/common';
import { GrantModel } from './models/grant.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GrantStatus } from '../core/grant-status.enum';
import { GrantOpportunity } from './models/grant-opportunity.model';
import { FoundationModel } from './models/foundation.model';

@Injectable()
export class GrantsSeed implements OnModuleInit {
  constructor(
    @InjectModel(GrantModel.name)
    private readonly grantModel: Model<GrantModel>,
    @InjectModel(GrantOpportunity.name)
    private readonly matchModel: Model<GrantOpportunity>,
    @InjectModel(FoundationModel.name)
    private readonly foundationModel: Model<GrantOpportunity>,
  ) {}

  public async onModuleInit() {
    await this.grantModel.deleteMany();
    await this.matchModel.deleteMany();
    await this.foundationModel.deleteMany();

    const foundations: Omit<FoundationModel, '_id' | 'id'>[] = [
      { name: 'Riska Foundation' },
      { name: 'Kappa Foundation' },
      { name: 'Fargate Foundation' },
      { name: 'Universe Foundation' },
      { name: 'Imea Foundation' },
      { name: 'Vila Foundation' },
    ];

    const createdFoundations =
      await this.foundationModel.insertMany(foundations);

    const grantParams: Omit<
      GrantModel,
      '_id' | 'id' | 'foundationId' | 'foundation'
    >[] = [
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Riska',
        location: 'Tbilisi, Georgia',
        areas: ['education', 'healthcare'],
      },
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Kappa',
        location: 'Batumi, Georgia',
        areas: ['education', 'healthcare'],
      },
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Fargate',
        location: 'London, UK',
        areas: ['education', 'healthcare'],
      },
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Universe',
        location: 'London, UK',
        areas: ['education', 'healthcare'],
      },
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Imea',
        location: 'Warsaw, Poland',
        areas: ['education', 'healthcare'],
      },
      {
        averageAmount: 55.55,
        deadline: new Date(),
        grantName: 'Vila',
        location: 'Vilnius, Lithuania',
        areas: ['education', 'healthcare'],
      },
    ];

    const grants: Omit<GrantModel, '_id' | 'id' | 'foundation'>[] =
      grantParams.map((params, index) => {
        return { ...params, foundationId: createdFoundations[index]._id };
      });

    const createdGrants = await this.grantModel.insertMany(grants);

    const matches: Omit<
      GrantOpportunity,
      'id' | '_id' | 'matchDate' | 'grant' | 'deleted'
    >[] = [
      ...createdGrants.slice(0, 2).map((grant) => {
        return {
          status: GrantStatus.APPLIED,
          grantId: grant._id,
        };
      }),
      ...createdGrants.slice(2, 4).map((grant) => {
        return {
          status: GrantStatus.CREATED,
          grantId: grant._id,
        };
      }),
    ];

    await this.matchModel.insertMany(matches);
  }
}
