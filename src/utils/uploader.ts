import cloudinary from '../config/cloudinary';

export const uploadImage = async (filePath: string) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: 'Acropolis'
  });
};

export const deleteImage = async (publicId: string) => {
  return await cloudinary.uploader.destroy(publicId);
};
