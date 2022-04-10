<h3>Funcionamiento</h3>

<p>Para comenzar basta ingresar el codigo "npm start". De esta forma se comienza usando MongoDB como persistencia estándar"</p> 
<p>Para usar Firebase se puede ingresar "npm start firebase"</p> 

<p>Se utilizó DAOS para poder elegir la presistencia entre Firebase y MongoDB inicialmente. Se pueden agregar otros mecanismos de persistencia agregando los modulos correspondientes en /models/config , /models/containers y /models/daos</p>

<p>Linea de lógica: Routes >> Controllers >> Services >> (daos si necesario) >> Persistencia/containers </p>

Carpeta models:
<ul>
<li>Config: Configuración a las bases de datos, de nodeMailer y passport para la autentificación del usuario en login y signup.</li>
<li>Containers: Esquemas para productos, carritos, mensajes y usuarios; contenedores correspondientes y archivo "index.js" con la logica para la aplicación del daos.</li>
<li>Controllers: controladores de las rutas, utilizando diversos servicios según sea necesario.</li>
<li>Daos: clases para la aplicación de los métodos de productos y carritos.</li>
<li>Servicios: son llamados por los controladores y se comunican con los mecanismos de persistencia según sea necesario.</li>
</ul>

<p>También se aplicó la librería Winston para crear loggers.<p>

<p>Carpeta /views para poder representar en un frontend las vistas de home, signup y login para facilitar el registro.</p>

<p>Algunas de las librerias utilizadas:</p>
<ul>
<li>bcrypt</li>
<li>dotenv</li>
<li>ejs</li>
<li>express-session</li>
<li>mongoose</li>
<li>nodemailer</li>
<li>passport</li>
<li>passport-local</li>
<li>socket.io</li>
<li>winston</li>
