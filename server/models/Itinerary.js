const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    destinations: [
        {
            name: String,
            activities: String,
            accommodation: String,
            date: Date
        }
    ],
    created_at: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Itinerary', ItinerarySchema);
