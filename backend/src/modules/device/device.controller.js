import Device from '../../DB/models/device.model.js'
import { publishMqtt } from '../../services/mqtt.js'

const DEVICE_ID = process.env.DEVICE_ID || 'ESP8266_01'
const COMMAND_TOPIC = 'home/door/command'

const sendDeviceCommand = async (res, command, lastCommand = command) => {
    try {
        const device = await Device.findOne({ deviceId: DEVICE_ID })

        if (!device) {
            return res.status(404).json({
                message: 'Device not found'
            })
        }

        await publishMqtt(
            COMMAND_TOPIC,
            JSON.stringify({ command })
        )

        await Device.updateOne(
            { deviceId: DEVICE_ID },
            {
                $set: {
                    lastCommand,
                    lastSeen: device.lastSeen
                }
            }
        )

        return res.status(200).json({
            message: 'Command sent successfully',
            lastCommand
        })

    } catch (error) {
        return res.status(
            error.message === 'MQTT is not connected' ? 503 : 500
        ).json({
            message: error.message
        })
    }
}

// Get Device Status
export const getDeviceStatus = async (req, res) => {
    try {
        const device = await Device.findOne({
            deviceId: req.params.deviceId
        })

        if (!device) {
            return res.status(404).json({
                message: 'Device not found'
            })
        }

        return res.status(200).json({
            message: 'Device status fetched successfully',
            device
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
}

// Garage Door
export const controlGarage = async (req, res) => {
    const { action } = req.body

    const commands = {
        open: 'GARAGE_OPEN',
        close: 'GARAGE_CLOSE'
    }

    if (!commands[action]) {
        return res.status(400).json({
            message: 'Action must be open or close'
        })
    }

    return sendDeviceCommand(res, commands[action])
}

// Apartment Door
export const controlApartment = async (req, res) => {
    const { action } = req.body

    const commands = {
        open: 'APARTMENT_OPEN',
        close: 'APARTMENT_CLOSE'
    }

    if (!commands[action]) {
        return res.status(400).json({
            message: 'Action must be open or close'
        })
    }

    return sendDeviceCommand(res, commands[action])
}

// Fan
export const controlFan = async (req, res) => {
    const { action } = req.body

    const commands = {
        on: 'FAN_ON',
        off: 'FAN_OFF'
    }

    if (!commands[action]) {
        return res.status(400).json({
            message: 'Action must be on or off'
        })
    }

    return sendDeviceCommand(res, commands[action])
}

// Fan Temperature Threshold
export const updateFanThreshold = async (req, res) => {
    const { fanOnTemp, fanOffTemp } = req.body

    const onTemp = Number(fanOnTemp)
    const offTemp = Number(fanOffTemp)

    if (
        fanOnTemp === undefined ||
        fanOffTemp === undefined ||
        fanOnTemp === '' ||
        fanOffTemp === '' ||
        !Number.isFinite(onTemp) ||
        !Number.isFinite(offTemp) ||
        onTemp < -20 ||
        onTemp > 100 ||
        offTemp < -20 ||
        offTemp >= onTemp
    ) {
        return res.status(400).json({
            message: 'Invalid fan temperature thresholds'
        })
    }

    const command = `FAN_THRESHOLD:${onTemp}:${offTemp}`

    return sendDeviceCommand(
        res,
        command,
        'FAN_THRESHOLD'
    )
}

// Apartment Password
export const updateApartmentPassword = async (req, res) => {
    const { newPassword, confirmPassword } = req.body

    if (
        typeof newPassword !== 'string' ||
        typeof confirmPassword !== 'string' ||
        !/^\d{4,10}$/.test(newPassword)
    ) {
        return res.status(400).json({
            message: 'Password must contain 4 to 10 digits'
        })
    }

    if (newPassword !== confirmPassword) {
        return res.status(400).json({
            message: 'Passwords do not match'
        })
    }

    const command = `SET_PASSWORD:${newPassword}:${confirmPassword}`

    return sendDeviceCommand(
        res,
        command,
        'SET_PASSWORD'
    )
}