import mongoose from 'mongoose';

const travelersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email constraint
  password: { type: String, required: true },
});

const Travelers = mongoose.models.Travelers || mongoose.model('Travelers', travelersSchema);

export default Travelers;
