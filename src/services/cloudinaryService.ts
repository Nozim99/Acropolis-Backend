import cloudinary from '../config/cloudinary';
import { UploadApiResponse } from 'cloudinary';

interface UploadResult {
  url: string;
  publicId: string;
}

export const uploadImage = async (filePath: string): Promise<UploadResult> => {
  try {
    const result: UploadApiResponse = await cloudinary.uploader.upload(filePath, {
      folder: 'Acropolis'
    });

    return {
      url: result.secure_url,
      publicId: result.public_id
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Rasmni yuklashda xatolik yuz berdi.');
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw new Error('There was an error deleting the image.');
  }
};
