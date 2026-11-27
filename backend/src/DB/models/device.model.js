import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
    deviceId: {
        type: String,
        required: true,
        unique: true
    },
    name: String,
    type: String,
    status: {
        type: String,
        enum: ["online", "offline"],
        default: "offline"
    },

    // Sensors
    temperature: Number,
    distance: Number,

    // Garage Door
    garageDoorStatus: {
        type: String,
        enum: ["open", "closed"],
        default: "closed"
    },

    // Apartment Door
    apartmentDoorStatus: {
        type: String,
        enum: ["open", "closed"],
        default: "closed"
    },

    // Fan
    fanStatus: {
        type: String,
        enum: ["on", "off"],
        default: "off"
    },
    fanOnTemp: Number,
    fanOffTemp: Number,

    // Keypad
    lastKey: String,
    passwordResult: String,

    // Connection
    lastSeen: Date,

    // Commands
    lastCommand: String,

    // Old fields (temporary compatibility)
    key: String,
    servo: Number,
    doorStatus: {
        type: String,
        enum: ["open", "closed"],
        default: "closed"
    }

}, { timestamps: true });

export default mongoose.model("Device", deviceSchema);