## Instrucciones para ejecutar la aplicación

### 1. Clonar el Repositorio:
```shell
git clone https://github.com/lauraresano/practica_zeo
cd practica_zeo
```

### 2. Configurar el Backend:
En el backend, la persistencia de los usuarios (si se guarda en memoria o en un archivo JSON) se controla con la variable `almacenamientoPersistente` en el archivo `backend/src/main/java/com/practica/backend/service/AltaUsuarioService.java`.

```java
@Service
public class AltaUsuarioService {

    private boolean almacenamientoPersistente = true; // Cambiar a 'false' para usar almacenamiento en memoria

    ...
```
Si la persistencia está configurada en memoria, los usuarios se perderán cuando se reinicie el servidor. `almacenamientoPersistente = false`

Si la persistencia está configurada en archivo, los usuarios se guardarán en un archivo JSON (usuarios.json), lo que permite que los datos se mantengan entre reinicios del servidor. `almacenamientoPersistente = true`

### 3. Ejecutar el Backend:
Dentro de la carpeta raíz del backend, ejecutar el siguiente comando:
```shell
mvn spring-boot:run
```
Esto iniciará el backend en el puerto predeterminado 8080

### 4. Ejecutar el Frontend:
Dentro de la carpeta raíz del frontend, iniciar el servidor de desarrollo de Angular:

```shell
ng serve
```
La aplicación se abrirá en: `http://localhost:4200`