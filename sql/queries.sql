-- sql/queries.sql

-- Consulta avanzada para obtener todas las notas combinando de forma relacional 
-- sus elementos de listas de control asociados y sus etiquetas mediante agregación JSON.

SELECT 
  n.*, -- Selecciona todas las columnas de la tabla de notas (id, title, content, type, color, etc.)
  
  -- Filtra y agrupa los elementos de la lista de control como un array de objetos JSON.
  -- Si la nota no tiene elementos, devuelve un array vacío en vez de nulos gracias al FILTER.
  json_agg(ci.*) FILTER (WHERE ci.id IS NOT NULL) as items,
  
  -- Filtra y agrupa los textos de las etiquetas como un array plano de strings.
  json_agg(nt.tag) FILTER (WHERE nt.id IS NOT NULL) as tags

FROM notes n

-- Usamos LEFT JOIN porque queremos traer absolutamente todas las notas de la izquierda, 
-- tengan o no tengan ítems o etiquetas asociados. Un INNER JOIN ignoraría las notas vacías.
LEFT JOIN checklist_items ci ON n.id = ci.note_id
LEFT JOIN note_tags nt ON n.id = nt.note_id

-- Agrupamos por el ID de la nota para que las funciones json_agg empaqueten los datos correctamente
GROUP BY n.id

-- Ordenamos para que las últimas notas creadas (o rutinas) aparezcan las primeras en el móvil
ORDER BY n.created_at DESC;