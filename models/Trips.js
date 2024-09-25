import mongoose from 'mongoose';

const tripsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    destinations: { type: [String], required: true },
    additionalPrice: { type: Number, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
});

const Trips = mongoose.models.Trips || mongoose.model('Trips', tripsSchema);

export default Trips;