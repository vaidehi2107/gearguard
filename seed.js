const mongoose = require('mongoose');
const User = require('./src/models/User');
const Team = require('./src/models/Team');
const Equipment = require('./src/models/Equipment');
require('dotenv').config();

const seedData = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data to avoid duplicates
        await User.deleteMany({});
        await Team.deleteMany({});
        await Equipment.deleteMany({});

        // 1. Create Users (Technicians and Managers)
        const users = await User.insertMany([
            { name: "Alice Tech", email: "alice@gearguard.com", role: "Technician" },
            { name: "Bob Mechanic", email: "bob@gearguard.com", role: "Technician" },
            { name: "John Manager", email: "john@gearguard.com", role: "Manager" }
        ]);

        // 2. Create Teams
        const itTeam = await Team.create({
            teamName: "IT Support",
            members: [users[0]._id] // Alice
        });

        const mechTeam = await Team.create({
            teamName: "Mechanics",
            members: [users[1]._id] // Bob
        });

        // 3. Create Equipment (Linked to Teams)
        await Equipment.insertMany([
            {
                name: "Dell XPS Laptop",
                serialNumber: "SN-1001",
                department: "Production",
                maintenanceTeam: itTeam._id,
                technician: users[0]._id,
                location: "Room 302"
            },
            {
                name: "CNC Milling Machine",
                serialNumber: "CNC-5588",
                department: "Manufacturing",
                maintenanceTeam: mechTeam._id,
                technician: users[1]._id,
                location: "Floor 1"
            }
        ]);

        console.log("Database seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();