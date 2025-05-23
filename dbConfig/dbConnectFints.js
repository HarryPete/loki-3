import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODBFINTS_URI;

if (!MONGODB_URI) 
{
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

let cached = global.mongoose;

if (!cached) 
{
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnectFints() 
{
  if(cached.conn) 
  {
    return cached.conn;
  }

  if (!cached.promise) 
  {
    const opts = 
    {
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => 
    {
      return mongoose;
    });
  }
  
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnectFints;
