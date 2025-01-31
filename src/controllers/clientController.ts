import { Request, Response } from 'express';
import Client from '../models/Client';
import { deleteImage, uploadImage } from '../services/cloudinaryService';
import fs from 'fs';

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
        fs.unlinkSync(image.path);

        const newClient = new Client({
          imageUrl: result.url,
          cloudinaryId: result.publicId
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


/**
 * Function to delete a client by ID.
 * Finds the client by ID and removes it from the database.
 */
export const deleteClient = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the client exists
    const client = await Client.findById(id);
    if (!client) {
      res.status(404).json({ message: 'Client not found.' });
      return;
    }

    if (client.cloudinaryId) {
      await deleteImage(client.cloudinaryId);
    }

    // Delete the client
    await Client.findByIdAndDelete(id);

    res.status(200).json({ message: 'Client deleted successfully!' });
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};