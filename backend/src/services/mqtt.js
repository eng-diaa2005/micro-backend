import mqtt from 'mqtt'
import Device from '../DB/models/device.model.js'

let client
let io

export const connectMqtt = (socketIo) => {
    io = socketIo

    const url = process.env.MQTT_URL || 'mqtt://127.0.0.1:1883'

    client = mqtt.connect(url, {
        clientId: `automation_home_backend_${Date.now()}`,
        username: process.env.MQTT_USERNAME,
        password: process.env.MQTT_PASSWORD,
        clean: true,
        connectTimeout: 10000,
        reconnectPeriod: 3000
    })

    client.on('connect', () => {
        console.log('MQTT Connected Successfully')

        client.subscribe('home/door/status', { qos: 1 }, (error) => {
            if (error) {
                console.log('MQTT Subscribe Error:', error.message)
            } else {
                console.log('Subscribed to home/door/status')
            }
        })
    })

    client.on('message', async (topic, message) => {
        try {
            const data = JSON.parse(message.toString())

            if (topic !== 'home/door/status') return

            // Device Events
            if (data.event) {
                console.log('Device Event:', data.event)

                if (io) {
                    io.emit('device:event', data)
                }

                return
            }

            if (!data.deviceId) {
                console.log('MQTT Message Missing deviceId')
                return
            }

            // Device Status
            const updateData = {
                status: 'online',
                lastSeen: new Date()
            }

            const fields = [
                'temperature',
                'distance',
                'garageDoorStatus',
                'apartmentDoorStatus',
                'fanStatus',
                'fanOnTemp',
                'fanOffTemp',
                'lastKey',
                'passwordResult'
            ]

            fields.forEach((field) => {
                if (data[field] !== undefined) {
                    updateData[field] = data[field]
                }
            })

            // Old Data Compatibility
            if (data.doorStatus !== undefined) {
                updateData.doorStatus = data.doorStatus
            }

            if (data.servo !== undefined) {
                updateData.servo = data.servo
            }

            if (data.key !== undefined) {
                updateData.key = data.key
            }

            const device = await Device.findOneAndUpdate(
                { deviceId: data.deviceId },
                {
                    $set: updateData,
                    $setOnInsert: {
                        name: 'Smart Home ESP',
                        type: 'ESP8266'
                    }
                },
                {
                    returnDocument: 'after',
                    upsert: true,
                    runValidators: true
                }
            )

            console.log('Device Status Updated:', device.deviceId)

            if (io) {
                io.emit('device:status', device)

                // Old Frontend Compatibility
                io.emit('door:status', {
                    deviceId: device.deviceId,
                    doorStatus: device.doorStatus,
                    servo: device.servo
                })
            }

        } catch (error) {
            console.log('MQTT Message Error:', error.message)
        }
    })

    client.on('error', (error) => {
        console.log('MQTT Error:', error.message)
    })

    client.on('reconnect', () => {
        console.log('MQTT Reconnecting...')
    })

    return client
}

export const publishMqtt = (topic, message) => {
    return new Promise((resolve, reject) => {
        if (!client || !client.connected) {
            return reject(new Error('MQTT is not connected'))
        }

        client.publish(topic, message, { qos: 1 }, (error) => {
            if (error) return reject(error)
            resolve(true)
        })
    })
}