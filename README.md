# 📊 ETL Dashboard - Data Pipeline Monitor

Dashboard web profesional para visualización de estadísticas y métricas de procesos ETL (Extract, Transform, Load).

## 🚀 Características

- ✅ Dashboard interactivo con KPIs principales
- 📈 Gráficos de líneas, barras y circular (Recharts)
- 📋 Tabla detallada de historial de ejecuciones ETL
- 🎨 UI moderna con Tailwind CSS
- 🔄 Auto-refresh configurable
- 📱 Diseño responsive (Desktop y Tablet)
- 🎯 TypeScript para type safety
- 🧩 Componentes reutilizables
- 🔌 Integración con API REST
- 🧪 Datos mockeados para desarrollo

## 📁 Estructura del Proyecto

```
etl-dashboard/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── charts/
│   │   │   ├── LineChart.tsx
│   │   │   ├── BarChart.tsx
│   │   │   └── PieChart.tsx
│   │   ├── KPICard.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── ErrorMessage.tsx
│   ├── pages/               # Vistas principales
│   │   ├── Dashboard.tsx
│   │   ├── ETLStatus.tsx
│   │   └── OtherPages.tsx
│   ├── hooks/               # Custom hooks
│   │   ├── useDashboard.ts
│   │   └── useETLExecutions.ts
│   ├── services/            # Servicios API
│   │   ├── api.ts
│   │   └── mockData.ts
│   ├── types/               # TypeScript types
│   │   └── index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── .env.example
└── README.md
```

## 🛠️ Tecnologías

- **React 18** - Framework UI
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos utility-first
- **Recharts** - Librería de gráficos
- **Lucide React** - Iconos modernos
- **Axios** - Cliente HTTP
- **Vite** - Build tool

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd etl-dashboard
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env
```

Editar `.env` con tus configuraciones:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_USE_MOCK_DATA=true
VITE_REFRESH_INTERVAL=30000
```

4. **Iniciar servidor de desarrollo**
```bash
npm run dev
```

El dashboard estará disponible en `http://localhost:5173`

## 🔌 Integración con API

### Estructura de Endpoints Esperados

El frontend espera que tu API REST implemente los siguientes endpoints:

#### 1. GET `/api/dashboard`
Retorna datos completos del dashboard.

**Respuesta:**
```typescript
{
  kpis: {
    totalRecords: number;
    successRecords: number;
    errorRecords: number;
    lastExecution: string; // ISO 8601
    averageDuration: number; // segundos
    successRate: number; // porcentaje
  },
  timeSeries: [
    {
      date: string; // "2024-02-10"
      processed: number;
      success: number;
      error: number;
    }
  ],
  statusDistribution: [
    {
      name: string; // "Exitosos" | "Con errores"
      value: number;
      color: string; // hex color
    }
  ],
  recentExecutions: ETLExecution[]
}
```

#### 2. GET `/api/etl/executions?limit=10`
Retorna historial de ejecuciones ETL.

**Respuesta:**
```typescript
[
  {
    id: string;
    executionDate: string; // ISO 8601
    status: "success" | "warning" | "error" | "running";
    duration: number; // segundos
    recordsProcessed: number;
    recordsSuccess: number;
    recordsError: number;
    startTime: string; // ISO 8601
    endTime: string; // ISO 8601
  }
]
```

#### 3. GET `/api/etl/executions/:id`
Retorna una ejecución específica.

#### 4. POST `/api/etl/trigger`
Ejecuta manualmente un proceso ETL.

### Conectar con tu API

1. **Editar `src/services/api.ts`:**
```typescript
const API_BASE_URL = 'https://tu-api.com/api';
```

2. **Cambiar a modo producción:**

En `src/hooks/useDashboard.ts` y `src/hooks/useETLExecutions.ts`:
```typescript
const { data } = useDashboard(false); // false = usa API real
```

3. **Configurar autenticación (si es necesario):**

Editar `src/services/api.ts`:
```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## 🎨 Personalización

### Colores del Dashboard

Editar `tailwind.config.js`:
```javascript
colors: {
  primary: {
    500: '#0ea5e9', // Color principal
    600: '#0284c7',
    // ...
  }
}
```

### Agregar nuevas métricas KPI

1. Crear nueva card en `src/pages/Dashboard.tsx`:
```tsx
<KPICard
  title="Nueva Métrica"
  value="123"
  icon={YourIcon}
  iconColor="text-purple-600"
  iconBgColor="bg-purple-100"
/>
```

### Agregar nuevos gráficos

Usar componentes de Recharts en `src/components/charts/`:
- `LineChart` - Tendencias temporales
- `BarChart` - Comparaciones
- `PieChart` - Distribuciones

## 📊 Componentes Principales

### KPICard
Muestra un indicador clave con icono, valor y tendencia opcional.

```tsx
<KPICard
  title="Total Registros"
  value={10000}
  icon={Database}
  trend={{ value: 12.5, isPositive: true }}
  subtitle="Últimos 7 días"
/>
```

### StatusBadge
Badge de estado con color e icono.

```tsx
<StatusBadge status="success" size="md" />
```

### Charts
Gráficos configurables con Recharts.

```tsx
<LineChart data={timeSeriesData} title="Tendencia" />
<BarChart data={comparisonData} title="Comparación" />
<PieChart data={distributionData} title="Distribución" />
```

## 🧪 Desarrollo con Datos Mockeados

El proyecto incluye datos de ejemplo en `src/services/mockData.ts` para desarrollo sin backend.

Para activar modo mock:
```typescript
const { data } = useDashboard(true); // true = usa mock data
```

## 🏗️ Build para Producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`.

## 📝 Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build de producción
- `npm run preview` - Preview del build

## 🔒 Buenas Prácticas Implementadas

- ✅ Separación de concerns (Layout, Pages, Components, Services)
- ✅ Custom hooks para lógica reutilizable
- ✅ Manejo de estados de carga y error
- ✅ TypeScript para type safety
- ✅ Componentes puros y funcionales
- ✅ Props bien tipadas
- ✅ Código documentado con JSDoc
- ✅ Diseño responsive
- ✅ Accesibilidad básica

## 🚀 Próximos Pasos

- [ ] Implementar autenticación
- [ ] Agregar filtros de fecha
- [ ] Exportar reportes a PDF/Excel
- [ ] Notificaciones en tiempo real
- [ ] Tests unitarios (Jest/Vitest)
- [ ] Tests E2E (Playwright/Cypress)
- [ ] Temas claro/oscuro
- [ ] Internacionalización (i18n)

## 📄 Licencia

MIT

## 👥 Contribuciones

Las contribuciones son bienvenidas. Por favor:
1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Soporte

Para preguntas o problemas, abre un issue en GitHub.

---

**Desarrollado con ❤️ usando React + TypeScript + Tailwind CSS**
