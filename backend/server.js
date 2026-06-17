

require("dotenv").config();

const express       = require("express");
const cors          = require("cors");
const connectDB     = require("./config/db");
const productRoutes = require("./routes/productRoutes");

connectDB();

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.json({ message: "👔 Men Fashion Store API is running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));