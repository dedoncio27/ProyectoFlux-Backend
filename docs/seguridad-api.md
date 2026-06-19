# Documentación de Seguridad de la API - Flux

## 1. SQL Injection (Inyección SQL)
La inyección SQL es una de las vulnerabilidades más críticas en el desarrollo de software. Ocurre cuando los datos introducidos por un usuario se concatenan directamente dentro de una consulta SQL sin ningún tipo de filtrado o separación. Esto permite a un atacante inyectar comandos SQL maliciosos que el motor de la base de datos ejecutará como si fuesen código legítimo.

### Ejemplo de código vulnerable (Concatenación directa):
Imaginemos que tenemos un endpoint para buscar notas por su título, y construimos la consulta uniendo textos:

```typescript
// VECTORES DE ATAQUE: El usuario escribe en la app móvil el siguiente texto:
// Option A: "'; DROP TABLE notes;--"
// Option B: "' OR '1'='1"

const userInput = req.body.title; 
const query = "SELECT * FROM notes WHERE title = '" + userInput + "'";