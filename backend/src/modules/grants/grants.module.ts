import { Module } from '@nestjs/common';
import { GrantResolver } from './presentation/grant.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { GrantModel, GrantSchema } from './infrastructure/models/grant.model';
import { GrantsSeed } from './infrastructure/grants.seed';
import { GrantsRepo } from './infrastructure/grants.repo';
import { GrantsService } from './application/grants.service';
import {
  GrantOpportunity,
  GrantOpportunitySchema,
} from './infrastructure/models/grant-opportunity.model';
import {
  FoundationModel,
  FoundationSchema,
} from './infrastructure/models/foundation.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GrantModel.name, schema: GrantSchema }]),
    MongooseModule.forFeature([
      { name: GrantOpportunity.name, schema: GrantOpportunitySchema },
    ]),
    MongooseModule.forFeature([
      { name: FoundationModel.name, schema: FoundationSchema },
    ]),
  ],
  providers: [GrantResolver, GrantsSeed, GrantsRepo, GrantsService],
})
export class GrantsModule {}
