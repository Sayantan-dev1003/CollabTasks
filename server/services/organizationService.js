// services/organizationService.js
import Organization from '../models/Organization.js';
import User from '../models/User.js'; // import User model

export const createOrganization = async (data) => {
    const {
        organizationName,
        organizationDomain,
        organizationDescription,
        organizationIndustry,
        organizationSize,
        adminId,
        adminName,
        adminEmail,
    } = data;

    if (!organizationName || !organizationDomain || !organizationDescription || !organizationIndustry || !organizationSize || !adminName || !adminEmail || !adminId) {
        throw new Error('Required fields are missing');
    }

    // 1. Create and save the organization
    const organization = new Organization(data);
    const savedOrg = await organization.save();

    // 2. Find the user by adminEmail
    const user = await User.findOne({ email: adminEmail });

    if (!user) {
        throw new Error('Admin user not found');
    }

    // 3. Update user's organization and role
    user.organization = savedOrg._id;
    await user.save();

    return savedOrg;
};