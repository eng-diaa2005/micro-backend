import { Router } from 'express'
import { authMiddleware } from '../../middleware/auth.middleware.js'

import {
    getDeviceStatus,
    controlGarage,
    controlApartment,
    controlFan,
    updateFanThreshold,
    updateApartmentPassword
} from './device.controller.js'

const router = Router()

// Device Status
router.get('/status/:deviceId', authMiddleware, getDeviceStatus)

// Garage Door
router.post('/garage', authMiddleware, controlGarage)

// Apartment Door
router.post('/apartment', authMiddleware, controlApartment)

// Fan
router.post('/fan', authMiddleware, controlFan)

// Fan Temperature Threshold
router.post('/fan/threshold', authMiddleware, updateFanThreshold)

// Apartment Password
router.post('/apartment/password', authMiddleware, updateApartmentPassword)

export default router