import express from 'express';
import { sendInvite } from '../controllers/inviteController.js';

const router = express.Router();

router.post('/invite-user', sendInvite);

export default router;