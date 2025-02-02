import { Request, Response } from 'express';
import Solution, { solution_categories } from '../models/Solution';


/**
 * Get Solution controller
 */
export const getSolutions = async (req: Request, res: Response) => {
  try {
    const solutions = await Solution.find().sort({ sort: 1 });

    res.json({
      message: 'Successfully completed',
      solutions
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};

export const getSolutionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const solution = await Solution.findById(id);

    if (!Solution) {
      res.status(404).json({ message: 'Solution not found' });
      return;
    }

    res.json({
      message: 'Successfully completed',
      solution
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
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

    const countDoc = await Solution.countDocuments({});

    const solutionData: {
      title: string;
      description: string[];
      category: string;
      title_uz?: string;
      title_en?: string;
      description_uz?: string[];
      description_en?: string[];
      sort: number;
    } = {
      title,
      description,
      category,
      sort: countDoc + 1
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

export const editSortSolutions = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;

    const updatePromises = data.map((solutionId: string, index: number) => {
      return Solution.findByIdAndUpdate(solutionId, { sort: index + 1 });
    });

    await Promise.all(updatePromises);

    res.status(200).json({ message: 'Solution sort updated successfully!' });
  } catch (error) {
    console.error('Error editing solution sort:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};

export const editSolution = async (req: Request, res: Response) => {
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

    const { id } = req.params;

    const solution = await Solution.findById(id);

    if (!solution) {
      res.status(400).json({ message: 'Solution not found' });
      return;
    }

    const newSolution = await Solution.findByIdAndUpdate(id, {
      category,
      title,
      title_uz,
      title_en,
      description,
      description_uz,
      description_en
    }, { new: true });


    res.status(201).json({
      message: 'Solution edited successfully!',
      solution: newSolution
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Internal Server Error' });
  }
};