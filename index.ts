import { Application } from './devDependencies.js';
import { route } from "./routes/index.ts";

const app = new Application();
app.use(route.routes())

app.use((ctx) => {
    ctx.response.body = "Hola mundos!"
})

    

app.listen({ port: 8000 });

console.log("Servidor andando en el puerto 8000");

// // @deno-types="https://deno.land/x/servest/types/react/index.d.ts";
// import React from "https://dev.jspm.io/react/index.js";
// // @deno-types="https://deno.land/x/servest/types/react-dom/server/index.d.ts";
// import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
// import { createApp } from "https://deno.land/x/servest/mod.ts";

// const app = createApp();

// app.get("/", async (req) => {
//     await req.respond({
//         status: 200,
//         headers: new Headers({
//             "content-type": "text/html"
//         }),
//         body: ReactDOMServer.renderToString(
//             <html>
//                 <head>
//                     <meta charSet='utf-8' />
//                     <title>Desafio con Servest</title>
//                 </head>
//                 <body>
//                     <div id="root">
//                         <form action="post">
//                             <label>Ingrese un color</label>                            
//                             <input type="text" name="color" />
//                         </form>
//                     </div>
//                 </body>
//             </html>
//         ),
//     });
// })


// // app.use(route.routes());

// // app.use((ctx) => {
// //     ctx.response.body = 'Hello World!';
// // })
