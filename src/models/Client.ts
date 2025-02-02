import mongoose, { Document, Schema } from 'mongoose';

export interface IClient extends Document {
  imageUrl: string;
  cloudinaryId: string;
  sort: number;
}

const ClientSchema: Schema = new Schema({
    imageUrl: {
      type: String,
      required: true
    },
    cloudinaryId: {
      type: String,
      required: true
    },
    sort: Number
  },
  {
    toJSON: {
      transform: (doc: Document, ret: { [key: string]: any }) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

export default mongoose.model<IClient>('Client', ClientSchema);
