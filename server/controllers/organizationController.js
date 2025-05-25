import { createOrganization as createOrgService } from '../services/organizationService.js';

export const createOrganization = async (req, res) => {
    try {
        const org = await createOrgService(req.body);
        res.status(201).json({ message: 'Organization created successfully', data: org });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};