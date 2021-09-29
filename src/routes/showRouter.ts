import { ShowController } from "../controller/ShowController";
import express from 'express'

export const showRouter = express.Router()

const showController = new ShowController()

showRouter.post("/create", showController.createShow)
showRouter.get("/get-by-week-day", showController.getShowsByWeekDay)