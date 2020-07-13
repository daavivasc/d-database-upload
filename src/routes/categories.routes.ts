import { Router } from 'express';
import { getRepository } from 'typeorm';

import Category from '../models/Category';

const categoriesRouter = Router();

categoriesRouter.post('/', async (req, res) => {
  const { title } = req.body;

  const categoriesRepository = getRepository(Category);

  const category = categoriesRepository.create({ title });

  await categoriesRepository.save(category);

  return res.json(category);
});

export default categoriesRouter;
