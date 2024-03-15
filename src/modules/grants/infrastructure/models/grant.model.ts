import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { FoundationModel } from './foundation.model';

export type GrantDocument = HydratedDocument<GrantModel>;

@Schema({ collection: 'grant', toJSON: { virtuals: true } })
export class GrantModel {
  _id: ObjectId;

  id: string;

  @Prop({ type: Types.ObjectId, ref: 'foundation' })
  foundationId: ObjectId;

  foundation?: FoundationModel;

  @Prop({ type: String })
  grantName: string;

  @Prop({ type: Number })
  averageAmount: number;

  @Prop({ type: Date })
  deadline: Date;

  @Prop({ type: String })
  location: string;

  @Prop({ type: [String], default: [] })
  areas: string[];
}

export const GrantSchema = SchemaFactory.createForClass(GrantModel);
