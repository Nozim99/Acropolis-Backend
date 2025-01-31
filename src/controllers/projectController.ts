import { Request, Response } from 'express';
import Project from '../models/Project';
import { uploadImage, deleteImage } from '../services/cloudinaryService';
import fs from 'fs';

/**
 * Get Projects controller
 * @param req
 * @param res
 */
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find();

    res.json({
      message: 'Successfully completed',
      projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internatl server error!' });
  }
};

/**
 * Create Project controller
 * @param req
 * @param res
 */
export const createProject = async (req: Request, res: Response) => {
  try {
    const image = req.file;

    const {
      title,
      title_uz,
      title_en,
      description,
      description_uz,
      description_en
    } = req.body;

    if (!title || !description) {
      res.status(400).json({ message: 'Title and Description are required' });
      return;
    }

    if (!image) {
      res.status(400).json({ message: 'Image is required' });
      return;
    }

    // Upload image to Cloudinary
    const result = await uploadImage(image.path);
    fs.unlinkSync(image.path);

    const newProject = new Project({
      title,
      title_uz,
      title_en,
      description,
      description_uz,
      description_en,
      image: {
        url: result.url,
        cloudinaryId: result.publicId
      }
    });

    await newProject.save();

    res.status(201).json({
      message: 'Project created successfully!',
      project: newProject
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internatl server error!' });
  }
};

/**
 * Delete Project controller
 */
export const deleteProject = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      res.status(404).json({ message: 'Project not found!' });
      return;
    }

    // Delete image from cloudinary
    if (project?.image?.cloudinaryId) {
      await deleteImage(project.image.cloudinaryId);
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({ message: 'Project deleted successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internatl server error!' });
  }
};