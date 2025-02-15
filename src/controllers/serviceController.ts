import { Request, Response } from 'express';
import Service from '../models/Service';

/**
 * Function to create a service.
 * Saves the service details to the database.
 */
export const createService = async (req: Request, res: Response) => {
  try {
    const {
      title, // default ru
      description,  // default ru
      title_uz,
      description_uz,
      title_en,
      description_en
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required.' });
    }

    const countDoc = await Service.countDocuments({});

    const data: {
      title: string;
      description: string;
      title_uz?: string;
      description_uz?: string;
      title_en?: string;
      description_en?: string;
      sort?: number;
    } = {
      title,
      description,
      sort: countDoc + 1
    };

    if (title_uz && description_uz) {
      data.title_uz = title_uz;
      data.description_uz = description_uz;
    }

    if (title_en && description_en) {
      data.title_en = title_en;
      data.description_en = description_en;
    }

    const newService = new Service(data);
    await newService.save();

    res.status(201).json({
      message: 'Service created successfully.',
      service: newService
    });
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const editService = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    const {
      title, // default ru
      description,  // default ru
      title_uz,
      description_uz,
      title_en,
      description_en
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: 'Title and description are required.' });
    }

    const data: {
      title: string;
      description: string;
      title_uz?: string;
      description_uz?: string;
      title_en?: string;
      description_en?: string
    } = {
      title,
      description
    };

    if (title_uz && description_uz) {
      data.title_uz = title_uz;
      data.description_uz = description_uz;
    }

    if (title_en && description_en) {
      data.title_en = title_en;
      data.description_en = description_en;
    }

    const newService = await Service.findByIdAndUpdate(id, data);

    res.status(201).json({
      message: 'Service edited successfully!',
      service: newService
    });
  } catch (error) {
    console.error('Error editing service:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

/**
 * Function to get all services.
 * Fetches and returns all the services from the database.
 */
export const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find().sort({ sort: 1 });
    res.status(200).json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const getServiceById = async (req: Request, res: Response) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      res.status(404).json({ message: 'Service not found' });
      return;
    }

    res.json(service);
  } catch (error) {
    console.error('Error fetching service by id', error);
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

export const editSortService = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const updatePromises = data.map((serviceId: string, index: number) => {
      return Service.findByIdAndUpdate(serviceId, { sort: index + 1 });
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Services updated successfully!' });
  } catch (error) {
    console.error('Error editing service:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};