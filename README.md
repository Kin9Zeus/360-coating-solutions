# 360 Coating Solutions & 360 Painting and Wall Design

Este repositorio contiene el código fuente de la página web para **360 Coating Solutions** y **360 Painting and Wall Design**, empresas enfocadas en recubrimientos B2B y diseño residencial. 

El proyecto está diseñado como una experiencia continua de **360°**, donde las distintas secciones de la página se dividen en grados (de 0° a 360°), acompañados de una interfaz que se despliega dinámicamente a medida que el visitante navega por el sitio.

La interfaz utiliza el sistema de diseño *"Steel & Silk"*, que representa ambas marcas con una combinación visual equilibrada entre un diseño estructural de tipo carbón (para recubrimientos B2B) y una tipografía serif editorial con colores cálidos (para diseño residencial).

## Tecnologías y Herramientas

- **React 19 + Vite**: Compilación a archivos estáticos de alto rendimiento.
- **Tailwind CSS v4**: Utilizado para tokens de diseño y estructuración de la interfaz (archivo `src/index.css`).
- **GSAP + ScrollTrigger**: Encargado de las animaciones, la coreografía de entrada y el efecto parallax a lo largo del sitio (optimizado para preferencias de movimiento reducido).
- **Express + Resend** (Directorio `server/`): El backend del proyecto encargado de servir el sitio construido y manejar las solicitudes del formulario de contacto mediante correos electrónicos, garantizando un flujo eficiente.

## Despliegue Local

El frontend y el backend de formulario de contacto se ejecutan en dos procesos separados en el entorno de desarrollo.

Para iniciar el proyecto localmente, ejecuta ambos comandos en dos terminales separadas:

```bash
npm install
cp .env.example .env   # Asegúrate de agregar tu RESEND_API_KEY real para probar el envío de correos

# Terminal 1: Inicia el frontend en http://localhost:5173
npm run dev            

# Terminal 2: Inicia la API de contacto en el puerto 3001
npm run server          
```

Vite actuará como proxy para `/api/*` hacia el servidor Express, permitiendo que el formulario funcione en desarrollo tal y como lo hará en producción. 

Para construir la versión de producción, utiliza:

```bash
npm run build      # Salida en el directorio dist/
```

## Secciones Configurables

El proyecto está diseñado para facilitar la actualización de contenido. A continuación, se indican los lugares clave para modificaciones:

| Contenido | Archivo / Ubicación |
|------|-------|
| Teléfono, email, áreas de servicio y enlaces sociales | `src/content/site.js` → Objeto `CONTACT` |
| Destinatarios del formulario de contacto | Variables de entorno en el servidor de despliegue (`RESEND_FROM`, `CONTACT_EMAIL_ADMIN`, etc.) |
| Testimonios de clientes | `src/content/site.js` → `TESTIMONIALS` |
| Servicios | `src/content/site.js` → `COATING_SERVICES` / `PAINTING_SERVICES` |
| Imágenes y Fotos | `src/assets/img/` (configuradas en `src/content/images.js`) |
| Colores y Tipografías de la Marca | `src/index.css` |

## Despliegue en Producción (Railway)

Este proyecto está optimizado para desplegarse como un servicio de Node único en Railway. El archivo `server/index.js` servirá tanto la aplicación estática construida como las solicitudes del formulario de contacto.

1. **Sube este repositorio a GitHub**.
2. **Crea un nuevo proyecto en Railway** y selecciona el repositorio. Asegúrate de configurar el directorio raíz a `site/`.
3. Railway instalará automáticamente las dependencias, ejecutará el script de build y lanzará el servidor.
4. **Configura las variables de entorno** en Railway:
   - `RESEND_API_KEY`: Tu clave de API desde el panel de Resend.
   - `RESEND_FROM`: El correo del remitente configurado (ej. `notifications@tudominio.com`).
   - `CONTACT_EMAIL_ADMIN`: El correo que recibirá los mensajes de contacto.
5. **Configura tu dominio personalizado** siguiendo las instrucciones de Railway para el DNS.

## Consideraciones Adicionales

- **Videos de alta calidad**: Los videos de las galerías se encuentran optimizados en formato WebP y MP4 web-safe para un rendimiento óptimo. 
- **Accesibilidad**: Se ha verificado que la página mantiene el cumplimiento de los estándares de contraste WCAG-AA, y las interacciones están completamente adaptadas para navegación por teclado. Se respetan las preferencias de reducción de movimiento del sistema operativo (`prefers-reduced-motion`).
- **Formulario de contacto seguro**: El sistema cuenta con mecanismos anti-spam invisibles para el usuario, límite de solicitudes (rate limiting) e inyección de encabezados prevenida desde el lado del servidor.

---

Desarrollado con profesionalismo y atención al detalle para **360 Coating Solutions**.