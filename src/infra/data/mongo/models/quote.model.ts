import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ collection: 'quote', timestamps: true })
export class QuoteModel extends Document {
  @Prop({
    name: 'carrier_id',
    type: mongoose.Schema.Types.Number,
    required: true,
  })
  carrierId: number;

  @Prop({
    name: 'carrier_name',
    type: mongoose.Schema.Types.String,
    required: true,
  })
  carrierName: string;

  @Prop({
    name: 'service',
    type: mongoose.Schema.Types.String,
    required: true,
  })
  service: string;

  @Prop({
    name: 'final_price',
    type: mongoose.Schema.Types.Number,
    required: true,
  })
  finalPrice: number;

  @Prop({
    name: 'deadline',
    type: mongoose.Schema.Types.Number,
    required: true,
  })
  deadline: number;
}

export const quoteModelSchema = SchemaFactory.createForClass(QuoteModel);
