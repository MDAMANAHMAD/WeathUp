require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
// body-parser is no longer needed, express has a built-in function
const cors = require("cors"); 

// --- NEW AUTH IMPORTS ---
const authRoutes = require("./routes/auth.routes");
const authMiddleware = require("./middleware/auth.middleware"); 
// ------------------------

const { HoldingsModel } = require("./models/HoldingsModel");
const { PositionsModel } = require("./models/PositionsModel");
const { OrdersModel } = require("./models/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// --- MIDDLEWARE SETUP ---
// Configure CORS to allow requests from your landing page (3000) and dashboard (3001)
app.use(cors({ 
    origin: [
        'http://localhost:3000', 
        'http://localhost:3001',
        'https://weathup-dashboard.onrender.com',
        /\.vercel\.app$/
    ],
    credentials: true
}));
// Use Express's built-in JSON parser instead of body-parser
app.use(express.json()); 

// --- AUTHENTICATION ROUTES ---
// All login/signup logic will be handled here (e.g., /api/auth/login, /api/auth/signup)
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("WealthUp Backend is running!");
});

// --- UNPROTECTED ROUTES (For initial data setup only) ---

app.get("/addHoldings", async (req, res) => {
    let tempHoldings = [
        // ... (Your existing holdings data)
        {
            name: "BHARTIARTL",
            qty: 2,
            avg: 538.05,
            price: 541.15,
            net: "+0.58%",
            day: "+2.99%",
        },
        {
            name: "HDFCBANK",
            qty: 2,
            avg: 1383.4,
            price: 1522.35,
            net: "+10.04%",
            day: "+0.11%",
        },
        {
            name: "HINDUNILVR",
            qty: 1,
            avg: 2335.85,
            price: 2417.4,
            net: "+3.49%",
            day: "+0.21%",
        },
        {
            name: "INFY",
            qty: 1,
            avg: 1350.5,
            price: 1555.45,
            net: "+15.18%",
            day: "-1.60%",
            isLoss: true,
        },
        {
            name: "ITC",
            qty: 5,
            avg: 202.0,
            price: 207.9,
            net: "+2.92%",
            day: "+0.80%",
        },
        {
            name: "KPITTECH",
            qty: 5,
            avg: 250.3,
            price: 266.45,
            net: "+6.45%",
            day: "+3.54%",
        },
        {
            name: "M&M",
            qty: 2,
            avg: 809.9,
            price: 779.8,
            net: "-3.72%",
            day: "-0.01%",
            isLoss: true,
        },
        {
            name: "RELIANCE",
            qty: 1,
            avg: 2193.7,
            price: 2112.4,
            net: "-3.71%",
            day: "+1.44%",
        },
        {
            name: "SBIN",
            qty: 4,
            avg: 324.35,
            price: 430.2,
            net: "+32.63%",
            day: "-0.34%",
            isLoss: true,
        },
        {
            name: "SGBMAY29",
            qty: 2,
            avg: 4727.0,
            price: 4719.0,
            net: "-0.17%",
            day: "+0.15%",
        },
        {
            name: "TATAPOWER",
            qty: 5,
            avg: 104.2,
            price: 124.15,
            net: "+19.15%",
            day: "-0.24%",
            isLoss: true,
        },
        {
            name: "TCS",
            qty: 1,
            avg: 3041.7,
            price: 3194.8,
            net: "+5.03%",
            day: "-0.25%",
            isLoss: true,
        },
        {
            name: "WIPRO",
            qty: 4,
            avg: 489.3,
            price: 577.75,
            net: "+18.08%",
            day: "+0.32%",
        },
    ];

    try {
        const savePromises = tempHoldings.map(item => {
            const newHolding = new HoldingsModel({
                name: item.name,
                qty: item.qty,
                avg: item.avg,
                price: item.price,
                // Assuming net and day models match the data structure
                net: item.net, 
                day: item.day,
            });
            return newHolding.save();
        });

        // Wait for ALL promises to resolve
        await Promise.all(savePromises);

        res.send("All Holdings Saved Successfully!");
    } catch (error) {
        console.error("Error saving holdings:", error);
        res.status(500).send("Error saving holdings: " + error.message);
    }
});

// Corrected /addPositions to use Promise.all for asynchronous saving
app.get("/addPositions", async (req, res) => {
    let tempPositions = [
        // ... (Your existing positions data)
        {
            product: "CNC",
            name: "EVEREADY",
            qty: 2,
            avg: 316.27,
            price: 312.35,
            net: "+0.58%",
            day: "-1.24%",
            isLoss: true,
        },
        {
            product: "CNC",
            name: "JUBLFOOD",
            qty: 1,
            avg: 3124.75,
            price: 3082.65,
            net: "+10.04%",
            day: "-1.35%",
            isLoss: true,
        },
    ];

    try {
        const savePromises = tempPositions.map((item) => {
            const newPosition = new PositionsModel({
                product: item.product,
                name: item.name,
                qty: item.qty,
                avg: item.avg,
                price: item.price,
                net: item.net,
                day: item.day,
                isLoss: item.isLoss,
            });
            return newPosition.save();
        });

        await Promise.all(savePromises);
        res.send("All Positions Saved Successfully!");
    } catch (error) {
        console.error("Error saving positions:", error);
        res.status(500).send("Error saving positions: " + error.message);
    }
});


// --- PROTECTED DATA ROUTES (Now require JWT) ---

// Apply authMiddleware to protect this route
app.get("/allHoldings", authMiddleware, async (req, res) => {
    let allHoldings = await HoldingsModel.find({ user: req.user.id });
    res.json(allHoldings);
});

// Apply authMiddleware to protect this route
app.get("/allPositions", authMiddleware, async (req, res) => {
    let allPositions = await PositionsModel.find({ user: req.user.id });
    res.json(allPositions);
});

app.get("/allOrders", authMiddleware, async (req, res) => {
    let allOrders = await OrdersModel.find({ user: req.user.id });
    res.json(allOrders);
});

// Apply authMiddleware to protect this route
app.post("/newOrder", authMiddleware, async (req, res) => {
    try {
        const { name, qty, price, mode } = req.body;
        const userId = req.user.id;
        
        // 1. Save the order
        let newOrder = new OrdersModel({
            name,
            qty,
            price,
            mode,
            user: userId
        });
        await newOrder.save();

        if (mode === "BUY") {
            let existingHolding = await HoldingsModel.findOne({ name, user: userId });
            if (existingHolding) {
                const totalQty = existingHolding.qty + parseInt(qty);
                const newAvg = ((existingHolding.avg * existingHolding.qty) + (price * qty)) / totalQty;
                existingHolding.qty = totalQty;
                existingHolding.avg = newAvg;
                existingHolding.price = price;
                await existingHolding.save();
            } else {
                await new HoldingsModel({
                    name,
                    qty,
                    avg: price,
                    price,
                    net: "0%",
                    day: "0%",
                    user: userId
                }).save();
            }

            let existingPosition = await PositionsModel.findOne({ name, user: userId });
            if (existingPosition) {
                existingPosition.qty += parseInt(qty);
                existingPosition.price = price;
                await existingPosition.save();
            } else {
                await new PositionsModel({
                    product: "CNC",
                    name,
                    qty,
                    avg: price,
                    price,
                    net: "0%",
                    day: "0%",
                    isLoss: false,
                    user: userId
                }).save();
            }
        } else if (mode === "SELL") {
            // Update Holdings for SELL
            let existingHolding = await HoldingsModel.findOne({ name, user: userId });
            if (existingHolding && existingHolding.qty >= qty) {
                existingHolding.qty -= parseInt(qty);
                existingHolding.price = price;
                if (existingHolding.qty === 0) {
                    await HoldingsModel.deleteOne({ name, user: userId });
                } else {
                    await existingHolding.save();
                }
            }

            // Update Positions for SELL
            let existingPosition = await PositionsModel.findOne({ name, user: userId });
            if (existingPosition) {
                existingPosition.qty -= parseInt(qty);
                existingPosition.price = price;
                if (existingPosition.qty <= 0) {
                    await PositionsModel.deleteOne({ name, user: userId });
                } else {
                    await existingPosition.save();
                }
            }
        }

        res.json({ msg: "Order saved and holdings updated!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Internal server error during order placement" });
    }
});


app.listen(PORT, () => {
    console.log(`App started on port ${PORT}!`);
    mongoose.connect(uri)
        .then(() => console.log("DB started!"))
        .catch((err) => console.error("DB Connection Error:", err));
});