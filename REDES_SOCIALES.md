# Apartado "Últimas Noticias - Redes Sociales"

## Resumen

Este apartado muestra un carrusel horizontal con publicaciones embebidas de Facebook e Instagram, con navegación por flechas, arrastre con mouse, autoplay e indicadores de puntos.

---

## 1. Estructura de Archivos

| Archivo | Función |
|---------|---------|
| `src/app/page.tsx` (líneas 346-452) | Carrusel principal "Últimas Noticias" |
| `src/components/ui/FacebookEmbed.tsx` | Componente para embeber reels/videos de Facebook |
| `src/components/ui/InstagramEmbed.tsx` | Componente para embeber posts de Instagram |
| `src/components/ui/FacebookPagePlugin.tsx` | Widget de página de Facebook (SDK) |
| `src/components/layout/Footer.tsx` | Links a redes sociales en el footer |
| `src/components/animations/FadeIn.tsx` | Animación `ScrollReveal` con Framer Motion |
| `src/types/index.ts` | Tipo `RedSocial` para validación de datos |

---

## 2. Tecnologías Utilizadas

- **Next.js 16.2.10** - Framework principal (App Router)
- **React 19.2.4** - Biblioteca UI con hooks (`useState`, `useEffect`, `useRef`)
- **TypeScript 5** - Tipado estático
- **Tailwind CSS 4** - Estilos utility-first (glassmorphism, responsive, animaciones)
- **Framer Motion 12.42.2** - Animaciones de entrada (`ScrollReveal`)
- **Facebook Video Plugin API** - `https://www.facebook.com/plugins/video.php`
- **Instagram Embed API** - `https://www.instagram.com/p/{id}/embed/captioned/`

---

## 3. Paso a Paso de la Implementación

### Paso 1: Sección Principal en `page.tsx`

El componente `HomePage` (`"use client"`) renderiza una sección con fondo oscuro (`bg-[#1a1a2e]`) que contiene:

- **Título animado**: `"Últimas noticias"` envuelto en `<ScrollReveal>` para animación de entrada con Framer Motion
- **Subtítulo**: `"Redes Sociales"`
- **Carrusel**: Contenedor horizontal scrolleable con 5 slides

### Paso 2: Inicialización del Estado del Carrusel

```typescript
const [currentSlide, setCurrentSlide] = useState(0);
const [visibleCards, setVisibleCards] = useState(3);
const carouselRef = useRef<HTMLDivElement>(null);
const TOTAL_SLIDES = 5;
const maxSlide = TOTAL_SLIDES - visibleCards;
```

- `currentSlide`: índice del slide visible
- `visibleCards`: cantidad responsiva (1 móvil, 2 tablet, 3 desktop)
- `carouselRef`: referencia al contenedor scrolleable

### Paso 3: Tracking Responsivo del Ancho de Tarjetas

Dos `useEffect` trabajan en conjunto:

1. **ResizeObserver**: observa el ancho de cada tarjeta para calcular desplazamiento
2. **Window resize listener**: actualiza `visibleCards` según breakpoints:
   - `< 640px`: 1 tarjeta
   - `640px - 1024px`: 2 tarjetas
   - `> 1024px`: 3 tarjetas

### Paso 4: Navegación del Carrusel

**Flechas**:

```typescript
const goToSlide = (index: number) => {
  const clampedIndex = Math.min(index, maxSlide);
  carouselRef.current?.scrollTo({ left: clampedIndex * cardWidth, behavior: "smooth" });
};
```

**Arrastre con mouse**:

- `handleMouseDown`: guarda posición inicial y estado `isDragging`
- `handleMouseMove`: calcula delta y hace scroll manual
- `handleMouseUpOrLeave`: libera el arrastre

**Sincronización con scroll**:

```typescript
const handleCarouselScroll = () => {
  const scrollLeft = carouselRef.current?.scrollLeft || 0;
  const slideIndex = Math.round(scrollLeft / cardWidth);
  setCurrentSlide(Math.min(slideIndex, maxSlide));
};
```

**Indicadores de puntos**: clic en cada punto llama a `goToSlide(index)`

### Paso 5: Autoplay

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => {
      const next = prev >= maxSlide ? 0 : prev + 1;
      goToSlide(next);
      return next;
    });
  }, 5000);
  return () => clearInterval(interval);
}, [maxSlide]);
```

- Avanza cada **5000ms** automáticamente
- Se pausa con `onMouseEnter` y se reanuda con `onMouseLeave`
- Se limpia al desmontar el componente

### Paso 6: Renderizado de Slides

Cada slide tiene esta estructura:

```tsx
<div className="snap-start flex-shrink-0 w-full sm:w-[calc((100%-16px)/2)] lg:w-[calc((100%-32px)/3)]">
  <div className="glassmorphism-card rounded-xl overflow-hidden">
    {/* Header con ícono de plataforma */}
    <div className="flex items-center gap-2 px-3 pt-3 pb-2">
      <svg>...</svg>  {/* SVG del logo de Facebook o Instagram */}
      <span>Facebook</span> o <span>Instagram</span>
    </div>
    {/* Embed */}
    <FacebookEmbed url="https://www.facebook.com/reel/..." />
    {/* o */}
    <InstagramEmbed url="https://www.instagram.com/p/..." />
  </div>
</div>
```

**Contenido de los 5 slides**:

1. Facebook Reel: `https://www.facebook.com/reel/1303982894857239`
2. Instagram Post: `https://www.instagram.com/p/Da3sePOH14Z/`
3. Facebook Reel: `https://www.facebook.com/reel/1511030220177667`
4. Instagram Post: `https://www.instagram.com/p/Dau3cZqjTKQ/`
5. Facebook Reel: `https://www.facebook.com/reel/890416943534685`

### Paso 7: Componente `FacebookEmbed`

**Props**: `{ url: string }`

1. Recibe la URL del reel/video
2. Construye la URL del plugin de Facebook:
   ```
   https://www.facebook.com/plugins/video.php?href={encodedUrl}&show_text=false&width=540&height=304&appId
   ```
3. Renderiza un `<iframe>` con:
   - Aspect ratio **9:16** (vertical, optimizado para reels)
   - `maxHeight: 400px`
   - Permisos: autoplay, clipboard-write, encrypted-media, picture-in-picture, web-share

### Paso 8: Componente `InstagramEmbed`

**Props**: `{ url: string; className?: string }`

1. Recibe la URL del post
2. Extrae el ID del post con regex: `/instagram\.com\/p\/([A-Za-z0-9_-]+)/`
3. Si el ID es válido, construye la URL de embed:
   ```
   https://www.instagram.com/p/{postId}/embed/captioned/
   ```
4. Renderiza un `<iframe>` con:
   - Aspect ratio **4:5**
   - `maxHeight: 560px`
5. Si la URL es inválida, muestra fallback con mensaje de error y link externo

### Paso 9: Animación de Entrada

El título `"Últimas noticias"` está envuelto en `<ScrollReveal>`:

```tsx
<ScrollReveal direction="up" delay={0.1}>
  <h2>Últimas noticias</h2>
</ScrollReveal>
```

Implementado con Framer Motion (`whileInView`, `viewport`, `initial/animate` states) en `src/components/animations/FadeIn.tsx`.

---

## 4. Tipos de Datos

```typescript
// src/types/index.ts
export type RedSocial = {
  tipo: "twitter" | "facebook" | "instagram" | "linkedin" | "tiktok" | "otro";
  url: string;
};
```

Validado con Zod en `src/lib/validators/index.ts`:

```typescript
redes: z.array(
  z.object({
    tipo: z.enum(["twitter", "facebook", "instagram", "linkedin", "tiktok", "otro"]),
    url: z.string().min(1),
  })
),
```

---

## 5. Nota Importante

Los embeds del carrusel están **hardcodeados directamente en `page.tsx`** y no son dinámicos desde el array `redes`. El array `redes` en `src/data/listas.ts` almacena links a perfiles, mientras que el carrusel usa URLs específicas de posts/reels escritas inline.
