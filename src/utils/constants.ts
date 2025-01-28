import dotenv from 'dotenv';


dotenv.config();


export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME || '';
export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || '';
export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || '';
export const MONGO_URI = process.env.MONGO_URI || '';
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 3758;
export const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
export const LOGIN_USERNAME = process.env.LOGIN_USERNAME || '';
export const LOGIN_PASSWORD = process.env.LOGIN_PASSWORD || '';
