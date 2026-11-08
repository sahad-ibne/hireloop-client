import { betterAuth } from "better-auth"
import { MongoClient } from "mongodb"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

const databaseUri = process.env.BETTER_AUTH_DB_URI

if (!databaseUri) {
  throw new Error(
    "BETTER_AUTH_DB_URI is not set. Add the MongoDB connection string to your environment."
  )
}

const client = new MongoClient(databaseUri, {
  serverSelectionTimeoutMS: 10_000,
})
const db = client.db("hireloopdb")

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["seeker", "recruiter", "admin"],
        required: true,
        input: true,
        defaultValue: "seeker",
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
})
