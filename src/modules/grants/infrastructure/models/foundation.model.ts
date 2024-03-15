import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';

export type FoundationDocument = HydratedDocument<FoundationModel>;

@Schema({ collection: 'foundation', toJSON: { virtuals: true } })
export class FoundationModel {
  _id: ObjectId;

  id: string;

  @Prop({ type: String })
  name: string;
}

export const FoundationSchema = SchemaFactory.createForClass(FoundationModel);
