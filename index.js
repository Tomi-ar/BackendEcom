import { Application } from './devDependencies.js';
import { route } from "./routes/index.ts";

const app = new Application();

app.use(route.routes());

app.use((ctx) => {
    ctx.response.body = 'Hello World!';
})

app.listen({ port: 8000 });

console.log("Servidor andando en el puerto 8000");