const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config();
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use('/uploads', express.static('public/uploads'));

app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes); // client sign-up/login & admin management
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes); // public contact form + admin listing
app.use("/api/dashboard", dashboardRoutes); // dashboard statistics

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
