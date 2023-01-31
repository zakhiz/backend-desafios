import express from "express";
import __dirname from "./utils.js";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import viewRouter from "./routes/views.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import productRouter from "./routes/product.router.js";
import cartRouter from "./routes/cart.router.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(cookieParser());

app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");

app.use("/", viewRouter);
app.use("/api/product", productRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/cart",cartRouter);

app.get("*", (req, res) => {
  res.render("rutanotexists");
});

app.listen(PORT, () => console.log(`Listening in ${PORT}`));
