import mongoose, { Document, Schema } from 'mongoose';


export interface IProject extends Document {
  title: string;
  title_uz: string;
  title_en: string;
  description: string;
  description_uz: string;
  description_en: string;
  image: {
    url: string;
    cloudinaryId: string;
  };
}


const ProjectSchema: Schema = new Schema({
  image: {
    url: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String,
      required: true
    }
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  title_uz: String,
  title_en: String,
  description_uz: String,
  description_en: String
});

export default mongoose.model<IProject>('Project', ProjectSchema);