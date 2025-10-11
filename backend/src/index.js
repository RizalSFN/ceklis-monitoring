import express from "express"
import cors from 'cors'
import userRouter from "./routes/user.routes.js"
import authRouter from "./routes/auth.routes.js"
import areaRouter from "./routes/area.routes.js"
import workScheduleRouter from "./routes/workSchedule.routes.js"
import checklistSessionRouter from "./routes/checklistSession.routes.js"
import checklistResultRouter from "./routes/checklistResult.routes.js"
import taskRouter from "./routes/task.routes.js"

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))

app.use(express.json())

app.use("/api/users", userRouter)
app.use("/api/auth", authRouter)
app.use("/api/area", areaRouter)
app.use("/api/task", taskRouter)
app.use("/api/work-schedule", workScheduleRouter)
app.use("/api/checklist-session", checklistSessionRouter)
app.use("/api/checklist-result", checklistResultRouter)

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
})