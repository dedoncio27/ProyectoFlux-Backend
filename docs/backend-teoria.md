# Documentación Teórica del Backend - Flux API

## 1. El Patrón Cliente-Servidor
El desarrollo de aplicaciones modernas se basa en la separación de responsabilidades mediante la arquitectura cliente-servidor. 
* **El Cliente (Frontend):** En nuestro caso, la aplicación móvil desarrollada con Expo/React Native. Es la interfaz con la que interactúa el usuario, captura eventos (pulsaciones de botones, escaneo de códigos con la cámara) y gestiona el estado local.
* **El Servidor (Backend):** Nuestra API REST construida con Next.js y desplegada en Vercel. Actúa como el cerebro centralizado y "guardián" del sistema. Su función es recibir peticiones del cliente, validar la integridad de los datos, aplicar reglas de negocio y comunicarse de forma segura con la base de datos.

### ¿Por qué la app móvil nunca debe conectarse directamente a la base de datos?
Si la aplicación móvil contuviera las credenciales de acceso directo (Connection String) a PostgreSQL dentro de su código binario, cualquier atacante podría descompilar el archivo APK o IPA de la app, extraer la contraseña y obtener acceso total de lectura, modificación y borrado de toda la base de datos. Al interponer la API como intermediaria, las credenciales permanecen ocultas y seguras en el servidor.

---

## 2. ¿Qué es una API REST?
REST (Representational State Transfer) es un estilo de arquitectura de software para guiar el diseño de redes de comunicación entre sistemas. Una API REST permite que el cliente y el servidor se comuniquen enviando y recibiendo paquetes de datos estructurados (generalmente en formato JSON) a través del protocolo HTTP.

---

## 3. Métodos HTTP y Operaciones de Datos (CRUD)
Los métodos HTTP indican la acción que el cliente desea realizar sobre un recurso del servidor, mapeando directamente con las operaciones CRUD básicas:

| Método HTTP | Operación CRUD | Descripción |
| :--- | :--- | :--- |
| **GET** | Read (Leer) | Recupera datos del servidor sin modificarlos (ej. obtener historial). |
| **POST** | Create (Crear) | Envía datos nuevos al servidor para crear un recurso (ej. registrar rutina). |
| **PATCH** | Update (Actualizar) | Modifica parcialmente un recurso existente (ej. marcar serie como completada). |
| **DELETE** | Delete (Borrar) | Elimina un recurso específico del servidor. |

---

## 4. Códigos de Estado HTTP
El servidor utiliza los códigos de estado HTTP para comunicarle al cliente el resultado de su petición de forma estandarizada:

* **200 OK:** La petición se ha completado correctamente y se devuelven los datos solicitados.
* **201 Created:** La petición ha sido un éxito y se ha creado un nuevo recurso (típico de respuestas `POST`).
* **400 Bad Request:** El servidor no puede procesar la petición porque los datos enviados por el cliente son inválidos o están incompletos (por ejemplo, fallos de validación con Zod).
* **401 Unauthorized:** El cliente no está autenticado o no ha provisto un token válido para acceder al recurso protegido.
* **404 Not Found:** El recurso solicitado no existe en el servidor.
* **500 Internal Server Error:** Ocurrió un error inesperado en el código del servidor o en la base de datos.

> **Regla de Seguridad:** Ante un error 500, la API jamás debe devolver el mensaje de error real o el *stack trace* de la base de datos al cliente. Esa información interna podría exponer detalles de la estructura de nuestras tablas que un atacante podría explotar. El servidor debe responder con un mensaje genérico (ej. `{"error": "Error interno"}`).

## 5. Diseño del Esquema Relacional (Diagrama Entidad-Relación)

Nuestra base de datos está compuesta por tres entidades principales conectadas mediante claves foráneas con integridad referencial (`ON DELETE CASCADE`):

```text
  ┌────────────────┐
  │     NOTES      │
  ├────────────────┤
  │ PK : id (UUID) │◄───┐
  │ title          │    │
  │ content        │    │ (1 a Muchas)
  │ type           │    │
  │ color          │    │
  └────────────────┘    │
           │            │
           │ (1 a Muchas)
           ▼            │
 ┌──────────────────┐   │   ┌──────────────────┐
 │ CHECKLIST_ITEMS  │   └───│    NOTE_TAGS     │
 ├──────────────────┤       ├──────────────────┤
 │ PK : id (UUID)   │       │ PK : id (UUID)   │
 │ FK : note_id     │       │ FK : note_id     │
 │ text             │       │ tag              │
 │ is_completed     │       └──────────────────┘
 └──────────────────┘

 ```

 ## 6. Consultas Relacionales Avanzadas: INNER JOIN vs LEFT JOIN

En las bases de datos relacionales, el uso de las uniones (`JOIN`) es fundamental para cruzar registros de distintas tablas mediante sus claves foráneas.

### INNER JOIN
Un `INNER JOIN` compara dos tablas y devuelve únicamente las filas donde existe una coincidencia exacta en ambas partes.
* **Ejemplo:** Si hiciéramos un `INNER JOIN` entre `notes` y `checklist_items`, la consulta **solo nos devolvería las notas que tienen como mínimo una tarea creada**. Si un usuario crea una nota limpia o una idea de texto sin lista, esa nota desaparecería por completo del resultado devuelto al móvil.

### LEFT JOIN
Un `LEFT JOIN` devuelve absolutamente todas las filas de la tabla de la izquierda (`notes`), junto con las filas coincidentes de la tabla de la derecha (`checklist_items`). Si no hay coincidencia, las columnas de la derecha se rellenan con valores `NULL`.
* **Ejemplo de uso en Flux:** Es el enfoque correcto para nuestra aplicación. Una nota de tipo "idea" o una rutina de entrenamiento que todavía no tiene ejercicios guardados debe seguir mostrándose en el menú principal del teléfono. El `LEFT JOIN` asegura que la nota se cargue correctamente, dejando el listado de ítems vacío de forma segura en lugar de ignorar la nota.