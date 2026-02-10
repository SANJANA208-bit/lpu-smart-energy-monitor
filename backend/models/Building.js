const mongoose = require('mongoose');

const BuildingSchema = new mongoose.Schema({
    building_id: {
        type: String,
        required: true,
        unique: true
    },
    building_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Academic', 'Hostel', 'Mess', 'Library']
    },
    location: {
        type: String,
        default: 'LPU Campus'
    },
    capacity: {
        type: Number,
        default: 0
    },
    expected_hours: {
        type: mongoose.Schema.Types.Mixed,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Building', BuildingSchema);
