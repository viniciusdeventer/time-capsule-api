import capsuleService from '../services/capsuleService.js';

export const createCapsule = async (req, res) => {
  const result = await capsuleService.create(req.body);
  res.status(201).json(result);
};

export const getCapsules = async (req, res) => {
  const result = await capsuleService.getAll(req.query);
  res.status(200).json(result);
};

export const updateCapsule = async (req, res) => {
  const result = await capsuleService.update(req.params.id, req.body);
  res.status(202).json(result);
};

export const deleteCapsule = async (req, res) => {
  await capsuleService.delete(req.params.id);
  res.status(200).json({ message: 'Capsule deleted successfully' });
};
