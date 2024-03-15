import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types, now } from 'mongoose';
import { GrantModel } from './grant.model';
import { GrantStatus } from '../../core/grant-status.enum';

export type GrantDocument = HydratedDocument<GrantOpportunity>;

@Schema({ collection: 'grant_opportunity', toJSON: { virtuals: true } })
export class GrantOpportunity {
  _id: ObjectId;

  id: string;

  @Prop({ type: Types.ObjectId, ref: 'grant' })
  grantId: ObjectId;

  grant?: GrantModel;

  @Prop({ type: String })
  status: GrantStatus;

  @Prop({ type: Date, default: now() })
  matchDate: Date;

  @Prop({ type: Boolean, default: false })
  deleted: boolean;
}

export const GrantOpportunitySchema =
  SchemaFactory.createForClass(GrantOpportunity);
