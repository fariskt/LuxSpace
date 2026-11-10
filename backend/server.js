require("dotenv").config();
const express = require("express");
const app = express();
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");
const wishListRoute = require("./routes/wishlistRoute");
const adminRoute = require("./routes/adminRoute")

const cors = require("cors");
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser")

connectDB();

const corsOption = {
    origin: 'https://luxspace-1.onrender.com',
    credentials:true
}
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


app.use("/api/admin", adminRoute)
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/users/cart", cartRoute);
app.use("/api/users/orders", orderRoute);
app.use("/api/users/wishlist", wishListRoute);

app.use(errorHandler)


app.listen(port, () => console.log(`server started running on port ${port}`));
