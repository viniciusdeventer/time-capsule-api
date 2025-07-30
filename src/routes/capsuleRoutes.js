import express from 'express';
import {
  createCapsule,
  getCapsules,
  updateCapsule,
  deleteCapsule,
} from '../controllers/capsuleController.js';

const router = express.Router();

router.post('/capsule', createCapsule);
router.get('/capsule', getCapsules);
router.put('/capsule/:id', updateCapsule);
router.delete('/capsule/:id', deleteCapsule);

export default router;
