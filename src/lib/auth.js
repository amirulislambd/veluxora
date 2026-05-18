import { betterAuth } from "better-auth";
const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db();
export const auth = betterAuth({

  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID , 
      clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    }, 
  }, 

  database: mongodbAdapter(db, {
    client
  }),
});