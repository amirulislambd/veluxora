import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db('veluxora-user');
export const auth = betterAuth({

  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    google: { 
      clientId: process.env.GOOGLE_CLIENT_ID, 
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
  },  
  }, 

  database: mongodbAdapter(db, {
    client
  }),
});