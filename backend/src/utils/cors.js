import cors from 'cors';

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS || ''
)
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

export const corsMiddleware = cors({
  origin(origin,callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin)
    ) {
      return callback(null,true);
    }

    return callback(
      new Error('Not allowed by CORS')
    );
  },
  methods:[
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
  ],
  allowedHeaders:[
    'Content-Type',
    'Authorization',
  ],
  credentials:true,
});