const express = require('express');
const router = express.Router();
const Itinerary = require('../models/Itinerary');

// Get all itineraries for a user
router.get('/:userId', async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ user: req.params.userId });
        res.json(itineraries);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single itinerary by its ID
router.get('/itinerary/:itineraryId', async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.itineraryId);
        if (!itinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(itinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new itinerary
router.post('/', async (req, res) => {
    try {
        const newItinerary = new Itinerary(req.body);
        const savedItinerary = await newItinerary.save();
        res.status(201).json(savedItinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update an itinerary
router.put('/:itineraryId', async (req, res) => {
    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            req.params.itineraryId,
            req.body,
            { new: true }
        );
        if (!updatedItinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json(updatedItinerary);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete an itinerary
router.delete('/:itineraryId', async (req, res) => {
    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(req.params.itineraryId);
        if (!deletedItinerary) {
            return res.status(404).json({ error: 'Itinerary not found' });
        }
        res.json({ message: 'Itinerary deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
