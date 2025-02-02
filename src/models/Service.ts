import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  title_uz: string;
  title_en: string;
  description: string;
  description_uz: string;
  description_ru: string;
  sort: number;
}

const ServiceSchema: Schema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title_uz: {
    type: String
  },
  description_uz: {
    type: String
  },
  title_en: {
    type: String
  },
  description_en: {
    type: String
  },
  sort: Number
});

export default mongoose.model<IService>('Service', ServiceSchema);
