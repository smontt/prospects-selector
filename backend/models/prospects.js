import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const prospectSchema = new Schema({
    name: String,
    email: String,
    country: String,
    jobTitle: String,
    yearsOfExperience: String,
    industry: String,
    companySize: String,
    score: Number
});

export default mongoose.model('Prospect', prospectSchema);
