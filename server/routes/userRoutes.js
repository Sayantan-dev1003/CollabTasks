import express from 'express';
import { getUserById, getUsersByOrganizationId, demoteUserRole, promoteUserRole, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.get('/:id', getUserById);
router.get('/organization/:id', getUsersByOrganizationId);
router.patch('/:userId', demoteUserRole);
router.patch('/:userId', promoteUserRole);
router.delete('/:userId', deleteUser);

export default router;