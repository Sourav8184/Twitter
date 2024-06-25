import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/connectDB.js";
import { v2 as cloudinary } from "cloudinary";

/* ----------------------------------------------------------------- */

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/* ----------------------------------------------------------------- */

const PORT = process.env.PORT || 8000;

/* ----------------------------------------------------------------- */

// DataBase Connection:
connectDB()
  .then(() => {
    // Some time database are connected but express app are not working
    app.on("error", (err) => {
      console.log(`Server is Not Start !!`);
    });

    app.listen(PORT, () => {
      console.log(`⚙️ Server is running at port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

/* ----------------------------------------------------------------- */

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

/* ----------------------------------------------------------------- */
