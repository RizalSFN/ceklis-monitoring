import express from "express"
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import areaRouter from "./routes/area.routes.js"
import workScheduleRouter from "./routes/workSchedule.routes.js"
import checklistSessionRouter from "./routes/checklistSession.routes.js"

const app = express()
app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/area", areaRouter)
app.use("/api/work-schedule", workScheduleRouter)
app.use("/api/checklist-session", checklistSessionRouter)

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})