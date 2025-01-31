import { Request, Response } from 'express';
import Solution, { solution_categories } from '../models/Solution';


/**
 * Get Solution controller
 */
export const getSolutions = async (req: Request, res: Response) => {
  try {
    const solutions = await Solution.find();

    res.json({
      message: 'Successfully completed',
      solutions
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

/**
 * Create Solution function
 */

export const createSolution = async (req: Request, res: Response) => {
  try {
    const {
      category,
      title,
      title_uz,
      title_en,
      description,
      description_uz,
      description_en
    } = req.body;

    if (!solution_categories.includes(category)) {
      res.status(400).json({ message: 'Invalid input category' });
      return;
    }

    if (!title || !description || !description.length || !Array.isArray(description)) {
      res.status(400).json({ message: 'title and description are required' });
      return;
    }

    const solutionData: {
      title: string;
      description: string[];
      category: string;
      title_uz?: string;
      title_en?: string;
      description_uz?: string[];
      description_en?: string[];
    } = {
      title,
      description,
      category
    };

    if (title_uz) solutionData.title_uz = title_uz;
    if (title_en) solutionData.title_en = title_en;
    if (description_uz) solutionData.description_uz = description_uz;
    if (description_en) solutionData.description_en = description_en;

    const newSolution = new Solution(solutionData);

    await newSolution.save();

    res.status(201).json({
      message: 'Solution created successfully!',
      solution: newSolution
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const deleteSolution = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const solution = Solution.findById(id);

    if (!solution) {
      res.status(400).json({ message: 'Solution not found' });
      return;
    }

    await Solution.findByIdAndDelete(id);

    res.json({ message: 'Solution deleted successfully!' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};