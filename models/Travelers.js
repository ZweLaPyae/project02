import mongoose from 'mongoose';

const travelersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Unique email constraint
  password: { type: String, required: true },
  country: { type: String, required: false },
  age: { type: Number, required: false },
  phoneNumber: { type: String, required: false },
  description: { type: String, required: false },
  avatarImageUrl: { type: String, required: false },
  bookedTrips: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Trips' }] // Reference to Trips model
});


// Ensure indexes are created
travelersSchema.index({ email: 1 }, { unique: true });

const Travelers = mongoose.models.Travelers || mongoose.model('Travelers', travelersSchema);

export default Travelers;
