import mongoose, { Schema, Document } from 'mongoose';


export const solution_categories = ['it-infrastructure', 'system-software', 'information-security'] as const;

export interface ISolution extends Document {
  category: typeof solution_categories[number];
  title: string;
  title_uz: string;
  title_en: string;
  description: string[];
  description_uz?: string[];
  description_en?: string[];
}


const solutionSchema = new Schema({
  category: {
    type: String,
    required: true,
    enum: solution_categories
  },
  title: {
    type: String,
    required: true
  },
  title_uz: String,
  title_en: String,
  description: {
    type: [String],
    required: true
  },
  description_uz: [String],
  description_en: [String]
});

export default mongoose.model<ISolution>('Solution', solutionSchema);