require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const EnergyData = require('../models/EnergyData');
const Building = require('../models/Building');
const energyDataJSON = require('../../src/data/energyData.json');

// Building information
const buildings = [
    {
        building_id: 'AB_A',
        building_name: 'Academic Block A',
        category: 'Academic',
        location: 'LPU Campus',
        capacity: 5000,
        expected_hours: {
            type: 'single',
            ranges: [{ start: 9, end: 17 }]
        }
    },
    {
        building_id: 'AB_B',
        building_name: 'Academic Block B',
        category: 'Academic',
        location: 'LPU Campus',
        capacity: 4500,
        expected_hours: {
            type: 'single',
            ranges: [{ start: 9, end: 17 }]
        }
    },
    {
        building_id: 'HH1',
        building_name: 'Hostel Block H1',
        category: 'Hostel',
        location: 'LPU Campus',
        capacity: 1000,
        expected_hours: {
            type: 'multiple',
            ranges: [
                { start: 6, end: 9 },
                { start: 18, end: 23 }
            ]
        }
    },
    {
        building_id: 'HH2',
        building_name: 'Hostel Block H2',
        category: 'Hostel',
        location: 'LPU Campus',
        capacity: 1000,
        expected_hours: {
            type: 'multiple',
            ranges: [
                { start: 6, end: 9 },
                { start: 18, end: 23 }
            ]
        }
    },
    {
        building_id: 'MESS',
        building_name: 'Mess Main',
        category: 'Mess',
        location: 'LPU Campus',
        capacity: 2000,
        expected_hours: {
            type: 'multiple',
            ranges: [
                { start: 7, end: 9 },
                { start: 12, end: 14 },
                { start: 19, end: 21 }
            ]
        }
    },
    {
        building_id: 'LIB',
        building_name: 'Central Library',
        category: 'Library',
        location: 'LPU Campus',
        capacity: 1500,
        expected_hours: {
            type: 'inverted',
            lowUsageRanges: [{ start: 0, end: 8 }]
        }
    }
];

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

// Seed database
const seedDatabase = async () => {
    try {
        await connectDB();

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        await EnergyData.deleteMany();
        await Building.deleteMany();

        // Insert buildings
        console.log('🏢 Inserting buildings...');
        await Building.insertMany(buildings);
        console.log(`✅ ${buildings.length} buildings inserted`);

        // Insert energy data
        console.log('⚡ Inserting energy data...');

        // Mark abnormal records
        const processedData = energyDataJSON.map(record => {
            // Check if energy is high outside expected hours (simplified logic)
            let isAbnormal = false;

            if (record.category === 'Academic' && (record.hour < 9 || record.hour > 17) && record.energy_kwh > 40) {
                isAbnormal = true;
            } else if (record.category === 'Mess' && record.energy_kwh > 30 &&
                ![7, 8, 9, 12, 13, 14, 19, 20, 21].includes(record.hour)) {
                isAbnormal = true;
            }

            return {
                ...record,
                isAbnormal,
                date: new Date()
            };
        });

        await EnergyData.insertMany(processedData);
        console.log(`✅ ${processedData.length} energy records inserted`);

        console.log('\n🎉 Database seeded successfully!');
        console.log('\n📊 Summary:');
        console.log(`   - Buildings: ${buildings.length}`);
        console.log(`   - Energy Records: ${processedData.length}`);
        console.log(`   - Abnormal Records: ${processedData.filter(r => r.isAbnormal).length}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Seed Error:', error);
        process.exit(1);
    }
};

// Run seed
seedDatabase();
