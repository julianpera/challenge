# Challenge

## Consigna

Necesitamos armar un formulario dinámico, donde el Frontend no sepa qué modelo de datos tiene el Backend, sino que se base en la declaración que le genera Backend para poder renderizar este formulario. 

El formulario se tiene que guardar en una base de datos NoSQL, validando contra el esquema que compartió, y poder consultarse por filtros en base a los campos que conforman su esquema.

```
Formulario de ejemplo: Nombre, Apellido, Fecha de nacimiento, País, Correo electrónico
Filtrado por: País, Año de nacimiento
```

Tecnologias ideales para resolverlo:
- React
- NodeJs
- Mongoose
- Typescript
- Docker

## ¿Cómo ejecutarlo?

```
git clone https://github.com/julianpera/challenge.git
cd challenge
docker compose up
```
Por defecto, se ejecutará en http://localhost:1997.
