# Flux API - Backend de Gestión de Notas y Rutinas

Este proyecto constituye el backend centralizado para la aplicación móvil Flux. Está desarrollado utilizando **Next.js** (App Router) con **TypeScript** y emplea **Neon Database** (PostgreSQL Serverless) como sistema de gestión de bases de datos relacionales.

## 🚀 Características Principales
* **Arquitectura Cliente-Servidor:** Separación total de responsabilidades, blindando la base de datos del cliente móvil.
* **Consultas Parametrizadas:** Protección nativa absoluta contra ataques de Inyección SQL (SQLi).
* **Validación Estricta:** Uso de **Zod** para la verificación estricta de esquemas de datos en el servidor.
* **Modelo Relacional Avanzado:** Uso de claves foráneas con `ON DELETE CASCADE` y agregación JSON mediante `LEFT JOIN`.

---

## 🛠️ Instalación y Configuración Local

1. Clonar el repositorio e instalar las dependencias necesarias:
   ```bash
   npm install
