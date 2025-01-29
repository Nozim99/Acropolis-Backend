import { Request, Response } from 'express';
import Service from '../models/Service';

/**
 * Function to create a service.
 * Saves the service details to the database.
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required.' });
    }

    const newService = new Service({ title, description });
    await newService.save();

    res.status(201).json({
      message: 'Service created successfully.',
      service: newService,
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Function to get all services.
 * Fetches and returns all the services from the database.
 */
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};


/**
 * Function to delete a service by ID.
 * Finds the service by ID and removes it from the database.
 */
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Check if the service exists
    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ message: 'Service not found.' });
      return;
    }

    // Delete the service
    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: 'Service deleted successfully.' });
  } catch (error) {
    console.error('Error deleting service:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};