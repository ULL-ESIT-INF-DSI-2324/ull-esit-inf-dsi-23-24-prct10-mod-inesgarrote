import net from "net";
import readline from "readline";

// Interfaz de lectura: Creamos una interfaz de lectura usando readline para leer la entrada del usuario
// desde la línea de comandos.
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Creamos un socket
const client = new net.Socket();

// Nos conectamos al servidor
client.connect(60300, "localhost", () => {
  console.log("Conectado al servidor");
  // Envío del Comando al Servidor: Utilizamos rl.question para solicitar al usuario que
  // introduzca un comando y lo enviamos al servidor cuando se proporciona.
  rl.question("Introduce el comando a ejecutar en el servidor: ", (command) => {
    // Enviando el comando al servidor
    client.write(command);
  });
});

// Manejo de los Datos del Servidor: Escuchamos los datos enviados por el servidor y los imprimimos en la consola.
client.on("data", (data) => {
  console.log("Respuesta del servidor:");
  console.log(data.toString());
});

// Manejo del Cierre de Conexión: Escuchamos el evento de cierre de la conexión y lo imprimimos en la consola.
client.on("close", () => {
  console.log("Conexión cerrada");
});
