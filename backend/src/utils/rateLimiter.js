import rateLimit from "express-rate-limit"

export const limiterForAuth = rateLimit({
    windowMs: Number(process.env.AUTH_WINDOW_MS),
    max: Number(process.env.MAX_REQUESTS_AUTH),
    legacyHeaders: false,
})

export const limiterForUser = rateLimit({
    windowMs: Number(process.env.USER_WINDOW_MS),
    max: Number(process.env.MAX_REQUESTS_USER),
    legacyHeaders: false,
})

export const limiterForComment = rateLimit({
    windowMs: Number(process.env.COMMENT_WINDOW_MS),
    max: Number(process.env.MAX_REQUESTS_COMMENT),
    legacyHeaders: false,
})

export const limiterForPost = rateLimit({
    windowMs: Number(process.env.POST_WINDOW_MS),
    max: Number(process.env.MAX_REQUESTS_POST),
    legacyHeaders: false,
})