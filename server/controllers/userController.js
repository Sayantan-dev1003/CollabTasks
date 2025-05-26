import User from '../models/User.js';
import Organization from '../models/Organization.js';

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getUsersByOrganizationId = async (req, res) => {
    try {
        const organizationId = req.params.id;
        const organization = await Organization.findById(organizationId);
        const users = await User.find({ organization: organizationId });
        res.status(200).json({ message: 'Users fetched successfully', users, organizationName: organization.organizationName });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const demoteUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User role updated successfully',
            role: updatedUser.role,
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const promoteUserRole = async (req, res) => {
    const { userId } = req.params;
    const { role } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User role updated successfully',
            role: updatedUser.role,
        });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: 'User deleted successfully',
            userId: deletedUser._id,
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};