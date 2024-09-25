import mongoose from 'mongoose';

const destinationsSchema = new mongoose.Schema({
    countryName: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    mediaUrl: { type: String, required: true },
});

const Destinations = mongoose.models.Destinations || mongoose.model('Destinations', destinationsSchema);

export default Destinations;