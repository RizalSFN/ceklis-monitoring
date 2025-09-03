import express from "express"
import userRouter from "./routes/user.routes"

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})