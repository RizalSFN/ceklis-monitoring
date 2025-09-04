import express from "express"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})