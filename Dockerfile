# ===========================
# Etapa 1: Build del proyecto
# ===========================
FROM node:24-alpine AS build

WORKDIR /app

# Build-time args para Vite
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias de producción
RUN npm ci

# Copiar el resto del proyecto, incluyendo el .env
COPY . .

# Compilar el proyecto (usa import.meta.env)
RUN npm run build

# ===========================
# Etapa 2: Imagen final
# ===========================
FROM node:24-alpine

WORKDIR /app

# Instalar servidor estático liviano
RUN npm install -g serve

# Copiar solo los archivos compilados
COPY --from=build /app/dist ./dist

# Exponer puerto para el proxy inverso
EXPOSE 3000

# Servir la app compilada
CMD ["serve", "-s", "dist", "-l", "3000"]