import express from 'express';
import { getUserById, getUsersByOrganizationId } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/organization/:id', getUsersByOrganizationId);

export default router;