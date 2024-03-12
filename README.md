# SGSDIF-BE
Backend del sistema web SGSDIF

---
Aquí les dejo una guía rápida sobre cómo clonar un repositorio de GitHub usando Git en la consola:

1. **Instala Git:**
   Si no lo tienes, primero necesitas instalar Git. Es gratis y lo puedes conseguir en (https://git-scm.com/).

2. **Abre tu terminal:**
   Abre la terminal de tu computadora. Si usas Windows, abre "Git Bash". Si usas Mac o Linux, simplemente usa la terminal que tengas.

3. **Navega hacia donde quieres clonar:**
   Usa el comando `cd` para ir al lugar en tu computadora donde quieras que esté el repositorio clonado. Por ejemplo:
   ```
   cd ruta/de/la/carpeta
   ```

4. **Clona el repositorio:**
   Usa el comando `git clone` seguido de la URL del repositorio en GitHub. La URL la encuentras en la página del repositorio en GitHub. Por ejemplo:
   ```
   git clone https://github.com/usuario/nombre-repositorio.git
   ```

5. **Verifica que se haya clonado:**
   Una vez hecho, ve a la carpeta del repositorio clonado con `cd` y luego mira los archivos con `ls` (en Mac/Linux) o `dir` (en Windows).

---

Ejecutando el proyecto por primera vez

1. **Instala Node.js:**
   Si no tienes Node.js instalado en tu sistema, descárgalo e instálalo desde (https://nodejs.org/). Node.js viene con npm, el administrador de paquetes de Node.js, que necesitarás para instalar las dependencias del proyecto.

2. **Abre tu terminal:**
   Abre la terminal de tu sistema operativo. Puedes usar la terminal integrada en macOS y Linux, o el programa "Git Bash" en Windows.

3. **Navega al directorio del proyecto clonado:**
   Utiliza el comando `cd` para cambiar al directorio del proyecto que acabas de clonar. Por ejemplo:
   ```
   cd ruta/del/proyecto
   ```

4. Crea el archivo .env y solicita las variables de entorno:
Crea un archivo llamado .env en la raíz del proyecto y solicita las variables de entorno necesarias para la configuración del proyecto. 

5. **Instala las dependencias del proyecto:**
   Ejecuta el siguiente comando para instalar todas las dependencias del proyecto, definidas en el archivo `package.json`:
   ```
   npm install
   ```

6. **Ejecuta el proyecto:**
   Una vez que todas las dependencias estén instaladas, puedes ejecutar el proyecto en modo de desarrollo. Utiliza el siguiente comando para iniciar el proyecto con Nodemon, que reflejará automáticamente los cambios en el código sin necesidad de reiniciar el servidor:
   ```
   npm run dev
   ```

7. **Verifica que el proyecto esté funcionando:**
   Después de ejecutar el proyecto, verifica que esté funcionando correctamente abriendo un navegador web y navegando a la URL o puerto especificado en la documentación del proyecto.

8. **Guarda los cambios para verlos reflejados:**
   Cuando realices cambios en los archivos del proyecto, simplemente guárdalos. Nodemon detectará los cambios y los reflejará automáticamente en tu servidor en ejecución, por lo que no necesitarás reiniciar manualmente el servidor cada vez que hagas cambios.

---

Instalacion MongoDB

1. **Descarga MongoDB:**
   Ve al sitio web oficial de MongoDB en (https://www.mongodb.com/try/download/community) y descarga la versión de MongoDB Community Server para tu sistema operativo. Selecciona la versión recomendada y sigue las instrucciones de descarga para tu sistema operativo específico.

2. **Instala MongoDB:**
   Una vez que se complete la descarga, abre el archivo de instalación y sigue los pasos del instalador para completar la instalación de MongoDB en tu sistema. Durante el proceso de instalación, puedes elegir las opciones predeterminadas a menos que desees personalizar la configuración.

3. **Descarga MongoDB Compass:**
   Después de instalar MongoDB, ve al sitio web de MongoDB Compass en (https://www.mongodb.com/try/download/compass) y descarga la versión de MongoDB Compass para tu sistema operativo. Elige la versión Community Edition y sigue las instrucciones de descarga para tu sistema operativo.

4. **Instala MongoDB Compass:**
   Una vez que se complete la descarga, abre el archivo de instalación y sigue los pasos del instalador para completar la instalación de MongoDB Compass en tu sistema. Al igual que con la instalación de MongoDB, puedes elegir las opciones predeterminadas a menos que desees personalizar la configuración.

5. **Inicia MongoDB Compass:**
   Una vez instalado, abre MongoDB Compass desde el menú de inicio o desde la ubicación donde se instaló en tu sistema. MongoDB Compass puede conectarse automáticamente a la instancia local de MongoDB si está en ejecución. Si MongoDB no está en ejecución, Compass intentará conectarse la próxima vez que inicies MongoDB.

