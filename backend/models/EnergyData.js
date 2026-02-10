const mongoose = require('mongoose');

const EnergyDataSchema = new mongoose.Schema({
    building_id: {
        type: String,
        required: true,
        index: true
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
    hour: {
        type: Number,
        required: true,
        min: 0,
        max: 23
    },
    energy_kwh: {
        type: Number,
        required: true,
        min: 0
    },
    date: {
        type: Date,
        default: () => new Date().setHours(0, 0, 0, 0)
    },
    isAbnormal: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
EnergyDataSchema.index({ building_id: 1, hour: 1, date: 1 });
EnergyDataSchema.index({ category: 1 });

module.exports = mongoose.model('EnergyData', EnergyDataSchema);
