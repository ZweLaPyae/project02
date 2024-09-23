import mongoose from 'mongoose';

const tripsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    description: { type: String, required: true },
    mediaUrl: { type: String, required: true },
    //
});

const Trips = mongoose.models.Trips || mongoose.model('Trips', tripsSchema);

export default Trips;