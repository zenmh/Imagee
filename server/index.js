import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import connectDB from "./mongodb/connect.js";
import imageeRoutes from "./routes/imageeRoutes.js";
import postRoutes from "./routes/postRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes);
app.use("/api/v1/imagee", imageeRoutes);

app.get("/", async (req, res) => {
  res.send("Hello, I'm Imagee. I can gerate Image what you want!!!");
});

const startServer = async () => {
  try {
    connectDB(process.env.URL);

    app.listen(8080, () =>
      console.log("Server has started on port http://localhost:8080")
    );
  } catch (err) {
    console.log(err);
  }
};

startServer();
