import { Router } from "../devDependencies.js";4
import { getColors, createColors } from '../controllers/colors.ts'

export const route = new Router()
.get("/colors", getColors)
.post("/colors", createColors)