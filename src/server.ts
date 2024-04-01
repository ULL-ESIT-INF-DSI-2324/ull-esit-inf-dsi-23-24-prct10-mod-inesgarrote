/*

Desarrolle un cliente y un servidor en Node.js, haciendo uso de sockets, que incorporen la siguiente funcionalidad:
El cliente debe recibir, desde la línea de comandos, un comando Unix/Linux, además de sus argumentos correspondientes, que ejecutaremos en el servidor.
El servidor debe recibir la petición del cliente, procesarla, esto es, ejecutar el comando solicitado, y devolver la respuesta del comando al cliente. Para ello, piense que el comando solicitado puede haberse ejecutado correctamente o puede haber fallado, por ejemplo, por no existir o porque se le han pasado unos argumentos no válidos.

*/

import net from "net";
import { spawn } from "child_process";

// Creamos un servidor
const server = net.createServer((connection) => {
  // conexión con el cliente
  console.log("Un cliente se ha conectado.");
  
  // Manejamos los datos recibidos del cliente
  connection.on("data", (data) => {
    // Manejo de los Datos del Cliente: Escuchamos los datos enviados por el cliente
    // y ejecutamos el comando recibido utilizando child_process.spawn.
    const command = data.toString().trim();
    console.log(`Comando recibido: ${command}`);

    const [cmd, ...args] = command.split(" ");

    const childProcess = spawn(cmd, args);

    // Enviamos la salida estándar o de error del proceso de comando de vuelta al cliente.
    childProcess.stdout.on("data", (data) => {
      // Enviamos la salida estándar del proceso al cliente
      connection.write(data);
    });

    childProcess.stderr.on("data", (data) => {
      // Enviamos la salida de error del proceso al cliente
      connection.write(data);
    });

    childProcess.on("close", (code) => {
      console.log(`El proceso hijo se ha cerrado con el código ${code}`);
      connection.end();
    });
  });

  // Manejamos el cierre de la conexión con el cliente
  connection.on("close", () => {
    console.log("Un cliente se ha desconectado.");
  });
});

// Ponemos el servidor a escuchar en el puerto 60300
server.listen(60300, () => {
  console.log("Esperando que los clientes se conecten.");
});
