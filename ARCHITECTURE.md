# 🏗️ Arquitectura y Deployment

## 📁 Estructura de Carpetas Detallada

```
etl-dashboard/
│
├── public/                      # Archivos estáticos
│   └── vite.svg
│
├── src/                         # Código fuente
│   │
│   ├── components/              # Componentes reutilizables
│   │   ├── layout/             # Componentes de layout
│   │   │   ├── Sidebar.tsx     # Menú lateral con navegación
│   │   │   └── Header.tsx      # Header con título y acciones
│   │   │
│   │   ├── charts/             # Componentes de gráficos
│   │   │   ├── LineChart.tsx   # Gráfico de líneas (tendencias)
│   │   │   ├── BarChart.tsx    # Gráfico de barras (comparaciones)
│   │   │   └── PieChart.tsx    # Gráfico circular (distribución)
│   │   │
│   │   ├── KPICard.tsx         # Card para mostrar KPIs
│   │   ├── StatusBadge.tsx     # Badge de estado (success/error/warning)
│   │   ├── LoadingSpinner.tsx  # Indicador de carga
│   │   └── ErrorMessage.tsx    # Mensaje de error con retry
│   │
│   ├── pages/                   # Vistas principales
│   │   ├── Dashboard.tsx       # Vista principal con KPIs y gráficos
│   │   ├── ETLStatus.tsx       # Vista de historial de ejecuciones
│   │   └── OtherPages.tsx      # Páginas placeholder (Statistics, Reports, Settings)
│   │
│   ├── hooks/                   # Custom React Hooks
│   │   ├── useDashboard.ts     # Hook para datos del dashboard
│   │   └── useETLExecutions.ts # Hook para ejecuciones ETL
│   │
│   ├── services/                # Servicios y lógica de negocio
│   │   ├── api.ts              # Cliente HTTP y endpoints API
│   │   └── mockData.ts         # Datos mockeados para desarrollo
│   │
│   ├── types/                   # Definiciones TypeScript
│   │   └── index.ts            # Tipos e interfaces
│   │
│   ├── App.tsx                  # Componente raíz con routing
│   ├── main.tsx                 # Entry point de la aplicación
│   └── index.css                # Estilos globales + Tailwind
│
├── .env.example                 # Template de variables de entorno
├── index.html                   # HTML principal
├── package.json                 # Dependencias y scripts
├── tsconfig.json               # Configuración TypeScript
├── tailwind.config.js          # Configuración Tailwind CSS
├── vite.config.ts              # Configuración Vite
├── README.md                    # Documentación principal
└── API_INTEGRATION.md          # Guía de integración API
```

## 🎯 Principios Arquitectónicos

### 1. Separación de Concerns

**Layout vs Pages vs Components**
- `Layout`: Estructura general (Sidebar, Header)
- `Pages`: Vistas completas (Dashboard, ETLStatus)
- `Components`: Piezas reutilizables (KPICard, Charts)

### 2. Custom Hooks para Lógica

Los hooks encapsulan:
- Llamadas a API
- Manejo de estados (loading, error, data)
- Auto-refresh
- Retry logic

### 3. Service Layer

`src/services/api.ts` centraliza:
- Configuración de Axios
- Definición de endpoints
- Interceptors (auth, logs, errores)
- Type-safe API calls

### 4. Type Safety

TypeScript asegura:
- Contratos API claros
- Props bien definidos
- Reducción de bugs en runtime
- Mejor DX con autocomplete

## 🔄 Flujo de Datos

```
User Interaction
       ↓
   Component
       ↓
  Custom Hook (useDashboard)
       ↓
   API Service
       ↓
   Backend REST API
       ↓
   Database (ETL)
       ↓
   Response
       ↓
   Custom Hook
       ↓
   Component Render
```

## 🚀 Guía de Deployment

### Opción 1: Vercel (Recomendado)

**Paso 1:** Instalar Vercel CLI
```bash
npm i -g vercel
```

**Paso 2:** Login
```bash
vercel login
```

**Paso 3:** Deploy
```bash
vercel --prod
```

**Configurar variables de entorno:**
En el dashboard de Vercel:
- Settings → Environment Variables
- Agregar `VITE_API_BASE_URL`
- Agregar `VITE_USE_MOCK_DATA=false`

### Opción 2: Netlify

**Paso 1:** Crear `netlify.toml`
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Paso 2:** Deploy
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Opción 3: Docker

**Paso 1:** Crear `Dockerfile`
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**Paso 2:** Crear `nginx.conf`
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend-api:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Paso 3:** Build y Run
```bash
docker build -t etl-dashboard .
docker run -p 80:80 etl-dashboard
```

### Opción 4: AWS S3 + CloudFront

**Paso 1:** Build
```bash
npm run build
```

**Paso 2:** Upload a S3
```bash
aws s3 sync dist/ s3://your-bucket-name --delete
```

**Paso 3:** Configurar CloudFront
- Crear distribución CloudFront
- Origin: S3 bucket
- Error Pages: 404 → /index.html (para routing)

### Opción 5: Servidor Tradicional (Apache/Nginx)

**Paso 1:** Build
```bash
npm run build
```

**Paso 2:** Copiar archivos
```bash
scp -r dist/* user@server:/var/www/html/
```

**Paso 3:** Configurar Nginx
```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔒 Variables de Entorno por Ambiente

### Desarrollo (.env.development)
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true
VITE_REFRESH_INTERVAL=0
```

### Staging (.env.staging)
```env
VITE_API_BASE_URL=https://api-staging.yourdomain.com/api
VITE_USE_MOCK_DATA=false
VITE_REFRESH_INTERVAL=60000
```

### Producción (.env.production)
```env
VITE_API_BASE_URL=https://api.yourdomain.com/api
VITE_USE_MOCK_DATA=false
VITE_REFRESH_INTERVAL=30000
```

## 📊 Performance Optimizations

### 1. Code Splitting

Vite hace code splitting automático. Para lazy loading manual:

```typescript
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const ETLStatus = lazy(() => import('./pages/ETLStatus'));

// En App.tsx
<Suspense fallback={<LoadingSpinner />}>
  <Dashboard />
</Suspense>
```

### 2. Image Optimization

```bash
npm install -D vite-plugin-imagemin
```

```typescript
// vite.config.ts
import viteImagemin from 'vite-plugin-imagemin';

export default {
  plugins: [viteImagemin()]
}
```

### 3. Bundle Analysis

```bash
npm run build
npx vite-bundle-visualizer
```

### 4. Caching Strategy

En `nginx.conf`:
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

## 🔍 Monitoring & Analytics

### Google Analytics

```typescript
// src/main.tsx
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');

// Track page views
ReactGA.send({ hitType: "pageview", page: window.location.pathname });
```

### Error Tracking (Sentry)

```typescript
// src/main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: import.meta.env.MODE,
});
```

## 🧪 Testing Strategy

### Unit Tests (Vitest)

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

```typescript
// src/components/__tests__/KPICard.test.tsx
import { render, screen } from '@testing-library/react';
import { KPICard } from '../KPICard';
import { Database } from 'lucide-react';

describe('KPICard', () => {
  it('renders title and value', () => {
    render(
      <KPICard 
        title="Test KPI" 
        value={100} 
        icon={Database} 
      />
    );
    expect(screen.getByText('Test KPI')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
});
```

### E2E Tests (Playwright)

```bash
npm install -D @playwright/test
```

```typescript
// e2e/dashboard.spec.ts
import { test, expect } from '@playwright/test';

test('dashboard loads and displays KPIs', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await expect(page.locator('h2')).toContainText('Dashboard');
  await expect(page.locator('text=Total Registros')).toBeVisible();
});
```

## 🔐 Security Best Practices

### 1. Environment Variables
- Nunca commitear `.env`
- Usar `.env.example` como template
- Variables sensibles en CI/CD secrets

### 2. API Security
```typescript
// XSS Protection
const sanitizeInput = (input: string) => {
  return input.replace(/[<>]/g, '');
};

// CSRF Token
apiClient.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  config.headers['X-CSRF-Token'] = csrfToken;
  return config;
});
```

### 3. Content Security Policy

```html
<!-- index.html -->
<meta 
  http-equiv="Content-Security-Policy" 
  content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';"
>
```

## 📈 Scaling Considerations

### Backend Load
- Implementar rate limiting
- Usar caché (Redis)
- CDN para assets estáticos

### Frontend Performance
- Virtualización para tablas grandes (react-window)
- Pagination en lugar de cargar todos los datos
- Debouncing en búsquedas

### Database
- Índices en columnas frecuentemente consultadas
- Queries optimizadas
- Connection pooling

## 🔄 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
        env:
          VITE_API_BASE_URL: ${{ secrets.API_URL }}
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

## 📝 Checklist de Deployment

- [ ] Build sin errores
- [ ] Tests pasando
- [ ] Variables de entorno configuradas
- [ ] CORS habilitado en backend
- [ ] SSL/HTTPS configurado
- [ ] Dominio personalizado (opcional)
- [ ] Analytics configurado
- [ ] Error tracking configurado
- [ ] Backups automatizados
- [ ] Monitoring activo
- [ ] Documentación actualizada

---

**¿Preguntas?** Consulta la documentación oficial de cada plataforma o abre un issue en GitHub.
