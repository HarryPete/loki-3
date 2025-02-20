import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODBDATA_URI environment variable inside .env.local'
  );
}

let cached = global.mongooseData;

if (!cached) {
  cached = global.mongooseData = { conn: null, promise: null };
}

async function dbConnectData() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => mongoose)
      .catch((error) => {
        console.error('MongoDB Data DB connection error:', error);
        throw error;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnectData;
