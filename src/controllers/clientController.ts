import { Request, Response } from 'express';
import Client from '../models/Client';
import { uploadImage } from '../utils/uploader';

/**
 * Function to create multiple clients.
 * Accepts multiple images, uploads each to Cloudinary, and creates a separate client for each.
 */
export const createClients = async (req: Request, res: Response): Promise<void> => {
  try {
    const images = req.files as Express.Multer.File[];

    if (!images?.length) {
      res.status(400).json({ message: 'At least one image is required.' });
      return;
    }

    const createdClients = await Promise.all(
      images.map(async (image) => {
        const result = await uploadImage(image.path);

        const newClient = new Client({
          imageUrl: result.secure_url,
          cloudinaryId: result.public_id
        });

        await newClient.save();
        return newClient;
      })
    );

    res.status(201).json({
      message: 'Clients created successfully.',
      clients: createdClients
    });
  } catch (error) {
    console.error('Error creating clients:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


export const getClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.find({}, { imageUrl: 1 }).lean();

    res.json({
      message: 'Successfully completed',
      clients
    });
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};