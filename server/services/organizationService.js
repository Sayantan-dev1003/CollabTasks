import Organization from '../models/Organization.js';

export const createOrganization = async (data) => {
    const { organizationName, organizationDomain, organizationDescription, organizationIndustry, organizationSize, adminName, adminEmail } = data;
    if (!organizationName || !organizationDomain || !organizationDescription || !organizationIndustry || !organizationSize || !adminName || !adminEmail) {
        throw new Error('Required fields are missing');
    }

    const organization = new Organization(data);
    return await organization.save();
};