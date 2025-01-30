import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  title: string;
  description: string;
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
  }
});

export default mongoose.model<IService>('Service', ServiceSchema);
