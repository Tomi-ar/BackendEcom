import { Router } from "../devDependencies.js";

export const route = new Router()
.get(("/", getColors)
.post("/", createColors)