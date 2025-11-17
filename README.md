Aquí tenés el **README.md final**, limpio, ordenado, formateado y listo para copiar/pegar directamente en tu repositorio.

---

# **Trailerflix – Trabajo Integrador React**

## 🎬 Introducción

Este proyecto consiste en el desarrollo de **Trailerflix**, una aplicación completa para visualizar trailers, creada con **React + Vite**.
El objetivo es integrar todos los conceptos aprendidos en el curso:

* Manejo de estado (`useState`)
* Efectos (`useEffect`)
* Routing con `react-router-dom`
* Context API (`useContext`)
* Hooks personalizados
* Búsqueda y filtros avanzados
* Persistencia de sesión con `localStorage`

---

## 📅 Fechas Importantes

* **Fecha de entrega:** Domingo 16 de noviembre de 2024 – hasta las 23:59
* **Formato de entrega:** Repositorio de GitHub con instrucciones claras de instalación y ejecución

---

## 📁 Archivos de Datos

Los archivos JSON se encuentran en la carpeta `public/data/`:

* `public/data/trailerflix.json` → catálogo de películas y series
* `public/data/usuarios.json` → datos de usuarios para login

> ⚠️ Importante: En Vite, los datos deben estar dentro de `public/` para ser accesibles vía *fetch*.

---

## ⚙️ Requerimientos Técnicos

### **Hooks y funcionalidades obligatorias**

* `useState` para manejar películas, usuarios, filtros, búsqueda y estado de la app
* `useEffect` para cargar datos desde JSON
* `react-router-dom` para navegación (Home, Detalles, 404)
* `useNavigate` para navegación programática
* `useContext` para autenticación global
* **Custom Hooks obligatorios:**

  * `useAuth` – autenticación
  * `useFilterMovies` – búsquedas y filtros

---

## 🔍 Funcionalidades Avanzadas

### **Búsqueda**

* Búsqueda en tiempo real
* Case-insensitive
* Busca por el campo `busqueda` del JSON (título, género, reparto…)

### **Filtros**

* Filtro por género (varios a la vez)
* Filtro por categoría (Película/Serie)
* Combinación de filtros + búsqueda
* Contador de resultados
* Mensaje cuando no hay coincidencias
* Botón de “limpiar filtros”

### **Persistencia**

* El usuario permanece logueado gracias a `localStorage`

---

## 🚀 Pasos Importantes (Resumen)

### **1. Cargar datos desde public/data/**

```jsx
useEffect(() => {
  const fetchMovies = async () => {
    const res = await fetch('/data/trailerflix.json');
    const data = await res.json();
    setMovies(data);
  };
  fetchMovies();
}, []);
```

### **2. Ejemplo lógica de filtros**

```js
const filterMovies = (movies, search, genres, categories) => {
  return movies.filter(movie => {
    const matchesSearch =
      !search ||
      movie.busqueda.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genres.length === 0 || genres.includes(movie.gen);

    const matchesCategory =
      categories.length === 0 || categories.includes(movie.categoria);

    return matchesSearch && matchesGenre && matchesCategory;
  });
};
```

---

## 🧭 Rutas Requeridas

| Ruta         | Descripción                 |
| ------------ | --------------------------- |
| `/`          | Página principal (catálogo) |
| `/movie/:id` | Detalles de película        |
| `*`          | Página 404                  |

---

## 📄 Página Principal (Home)

Debe incluir:

* Lista de películas
* Búsqueda en tiempo real
* Filtros múltiples
* Contador de resultados
* Mensaje “no hay resultados”
* Navegación a detalles
* Estados de carga
* Diseño responsive

---

## 🎞️ Página Detalles (MovieDetail)

Debe mostrar:

* Poster
* Título
* Género
* Resumen
* Reparto
* Tráiler
* Botón “Volver al inicio”

---

## ❌ Página 404

Debe incluir:

* Logo de TRAILERFLIX
* Mensaje “404 – Página no encontrada”
* Botón para volver al inicio
* Estética consistente (fondo negro, texto rojo/blanco)

---

## 🔐 Sistema de Autenticación

* Manejado con `useContext`
* Login validado contra `usuarios.json`
* Debe mostrar:

  * Formulario si NO está logueado
  * Nombre + botón “Cerrar sesión” si está logueado
* Persistencia con `localStorage`

---

## 🧩 Custom Hooks Obligatorios

* **`useAuth`** → lógica de login, logout y persistencia
* **`useFilterMovies`** → lógica de búsqueda + filtros

---

## 📂 Estructura Sugerida del Proyecto

```
proyecto-react/
├── public/
│   └── data/
│       ├── trailerflix.json
│       └── usuarios.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   ├── context/
│   ├── utils/
│   ├── App.jsx
│   └── main.jsx
└── package.json
```

---

## 📝 Evaluación

Se evaluará:

* Funcionalidad completa de la app
* Uso adecuado de hooks
* Modularidad y organización
* Correcta implementación de autenticación global
* Manejo de errores y página 404
* Carga de datos desde `public/data/`
* Sistema de búsqueda + filtros
* Persistencia de sesión
* UI/UX clara y responsiva

---

## 📤 Instrucciones de Entrega

1. Crear un repositorio **público** en GitHub
2. Incluir **README.md** con:

   * Descripción
   * Instalación (`npm install`)
   * Ejecución (`npm run dev`)
   * Capturas de pantalla
3. Subir el proyecto completo
4. Enviar enlace antes del **16/11/2024 – 23:59**

---

## 🧠 Notas Finales

* Se evaluarán todos los conceptos del curso
* Se espera código limpio, modular y funcional
* No debe haber errores en consola
* La búsqueda + filtros y la persistencia tienen **alto valor** en la nota
* Consultar al profesor en caso de dudas


