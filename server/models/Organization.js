import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationDomain: { type: String, required: true, unique: true },
  organizationDescription: { type: String, required: true },
  organizationIndustry: { type: String, required: true, enum: ['Tech', 'Healthcare', 'Education', 'Finance', 'Retail', 'Other'] },
  organizationSize: { type: String, required: true, enum: ['1-10', '11-50', '51-200', '201-500', '500+'] },
  adminName: { type: String, required: true },
  adminEmail: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Organization", organizationSchema);