# 🔌 Guía de Integración API

Esta guía detalla cómo conectar el dashboard ETL con tu backend.

## 📋 Resumen de Integración

El frontend consume datos a través de Axios desde endpoints REST. La arquitectura permite cambiar fácilmente entre datos mockeados (desarrollo) y API real (producción).

## 🛠️ Configuración Inicial

### 1. Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# URL de tu API backend
VITE_API_BASE_URL=https://api.tu-dominio.com/api

# Modo de datos (true = mock, false = API real)
VITE_USE_MOCK_DATA=false

# Auto-refresh en milisegundos (opcional)
VITE_REFRESH_INTERVAL=30000
```

### 2. Configurar Cliente HTTP

El cliente HTTP está pre-configurado en `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## 📡 Endpoints Requeridos

### Dashboard Endpoint

**GET** `/api/dashboard`

Retorna todos los datos necesarios para la vista principal.

**Headers:**
```
Content-Type: application/json
Authorization: Bearer {token} (opcional)
```

**Respuesta Exitosa (200):**
```json
{
  "kpis": {
    "totalRecords": 80601,
    "successRecords": 79985,
    "errorRecords": 616,
    "lastExecution": "2024-02-10T08:34:05Z",
    "averageDuration": 238,
    "successRate": 99.24
  },
  "timeSeries": [
    {
      "date": "2024-02-05",
      "processed": 14923,
      "success": 14923,
      "error": 0
    },
    {
      "date": "2024-02-06",
      "processed": 15678,
      "success": 15678,
      "error": 0
    }
  ],
  "statusDistribution": [
    {
      "name": "Exitosos",
      "value": 79985,
      "color": "#10b981"
    },
    {
      "name": "Con errores",
      "value": 616,
      "color": "#ef4444"
    }
  ],
  "recentExecutions": [
    {
      "id": "exec-001",
      "executionDate": "2024-02-10T08:30:00Z",
      "status": "success",
      "duration": 245,
      "recordsProcessed": 15420,
      "recordsSuccess": 15420,
      "recordsError": 0,
      "startTime": "2024-02-10T08:30:00Z",
      "endTime": "2024-02-10T08:34:05Z"
    }
  ]
}
```

**Respuesta Error (500):**
```json
{
  "error": "Internal server error",
  "message": "Descripción del error"
}
```

### ETL Executions Endpoint

**GET** `/api/etl/executions?limit={number}`

Retorna historial de ejecuciones.

**Query Parameters:**
- `limit` (opcional): Número máximo de resultados (default: sin límite)

**Respuesta Exitosa (200):**
```json
[
  {
    "id": "exec-001",
    "executionDate": "2024-02-10T08:30:00Z",
    "status": "success",
    "duration": 245,
    "recordsProcessed": 15420,
    "recordsSuccess": 15420,
    "recordsError": 0,
    "startTime": "2024-02-10T08:30:00Z",
    "endTime": "2024-02-10T08:34:05Z"
  }
]
```

**Valores válidos para `status`:**
- `success` - Ejecución exitosa
- `warning` - Ejecución con advertencias
- `error` - Ejecución con errores
- `running` - Ejecución en progreso

### Single Execution Endpoint

**GET** `/api/etl/executions/{id}`

Retorna detalles de una ejecución específica.

**Respuesta Exitosa (200):**
```json
{
  "id": "exec-001",
  "executionDate": "2024-02-10T08:30:00Z",
  "status": "success",
  "duration": 245,
  "recordsProcessed": 15420,
  "recordsSuccess": 15420,
  "recordsError": 0,
  "startTime": "2024-02-10T08:30:00Z",
  "endTime": "2024-02-10T08:34:05Z"
}
```

**Respuesta Error (404):**
```json
{
  "error": "Not found",
  "message": "Execution not found"
}
```

### Trigger Execution Endpoint

**POST** `/api/etl/trigger`

Ejecuta manualmente un proceso ETL.

**Request Body:**
```json
{
  "source": "manual",
  "parameters": {
    "option1": "value1"
  }
}
```

**Respuesta Exitosa (200):**
```json
{
  "message": "ETL process started successfully",
  "executionId": "exec-new-001"
}
```

## 🔐 Autenticación

Si tu API requiere autenticación, agregar en `src/services/api.ts`:

### JWT Bearer Token

```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### API Key

```typescript
apiClient.interceptors.request.use((config) => {
  config.headers['X-API-Key'] = 'tu-api-key';
  return config;
});
```

## 🔄 Cambiar de Mock a API Real

### En los Hooks

**src/hooks/useDashboard.ts:**
```typescript
// Desarrollo (mock data)
const { data } = useDashboard(true);

// Producción (API real)
const { data } = useDashboard(false);
```

**src/hooks/useETLExecutions.ts:**
```typescript
// Desarrollo (mock data)
const { executions } = useETLExecutions(true);

// Producción (API real)
const { executions } = useETLExecutions(false);
```

### Usando Variable de Entorno

Modificar los hooks para usar la variable de entorno:

```typescript
const USE_MOCK = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const useDashboard = (refreshInterval?: number) => {
  // ... resto del código
  
  if (USE_MOCK) {
    await simulateNetworkDelay(600);
    dashboardData = mockDashboardData;
  } else {
    dashboardData = await dashboardAPI.getDashboardData();
  }
};
```

## 🧪 Testing de Integración

### Usando cURL

```bash
# Test Dashboard endpoint
curl -X GET http://localhost:3000/api/dashboard \
  -H "Content-Type: application/json"

# Test ETL executions endpoint
curl -X GET "http://localhost:3000/api/etl/executions?limit=10" \
  -H "Content-Type: application/json"

# Test trigger endpoint
curl -X POST http://localhost:3000/api/etl/trigger \
  -H "Content-Type: application/json" \
  -d '{"source":"manual"}'
```

### Usando Postman

1. Importar los endpoints
2. Configurar variables de entorno
3. Agregar headers de autenticación
4. Probar cada endpoint

## 🐛 Manejo de Errores

El dashboard maneja automáticamente:

- **Network errors** - Sin conexión
- **Timeout errors** - Tiempo de espera agotado
- **HTTP errors** - 4xx, 5xx
- **Parsing errors** - Respuesta inválida

Los errores se muestran con el componente `ErrorMessage` y opción de reintentar.

## 📊 Formato de Fechas

Todas las fechas deben estar en formato ISO 8601:

```
"2024-02-10T08:30:00Z"
```

El frontend las formateará automáticamente según la localización.

## ⚡ Optimizaciones

### Caché de Respuestas

Agregar en `src/services/api.ts`:

```typescript
import { setupCache } from 'axios-cache-interceptor';

const cachedClient = setupCache(apiClient, {
  ttl: 5 * 60 * 1000, // 5 minutos
});
```

### Retry Logic

```typescript
import axiosRetry from 'axios-retry';

axiosRetry(apiClient, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
});
```

## 🔍 Debugging

### Activar logs de Axios

```typescript
apiClient.interceptors.request.use((config) => {
  console.log('📤 Request:', config.method?.toUpperCase(), config.url);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    console.log('📥 Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('❌ Error:', error.message);
    return Promise.reject(error);
  }
);
```

## 📝 Ejemplo de Backend (Node.js/Express)

```javascript
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Dashboard endpoint
app.get('/api/dashboard', async (req, res) => {
  try {
    // Lógica para obtener datos del ETL
    const data = await getDashboardData();
    res.json(data);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

// ETL executions endpoint
app.get('/api/etl/executions', async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || undefined;
    const executions = await getETLExecutions(limit);
    res.json(executions);
  } catch (error) {
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
});

app.listen(3000, () => {
  console.log('API running on port 3000');
});
```

## ✅ Checklist de Integración

- [ ] Endpoints implementados en el backend
- [ ] CORS configurado correctamente
- [ ] Variables de entorno configuradas
- [ ] Autenticación implementada (si es necesario)
- [ ] Formato de respuestas validado
- [ ] Manejo de errores probado
- [ ] Timeout configurado
- [ ] Testing con datos reales
- [ ] Logs habilitados para debugging
- [ ] Documentación API actualizada

## 🆘 Problemas Comunes

### CORS Error
```
Access to fetch at 'API_URL' from origin 'http://localhost:5173' has been blocked
```

**Solución:** Configurar CORS en el backend:
```javascript
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### 401 Unauthorized
Verificar que el token de autenticación esté siendo enviado correctamente.

### Timeout
Aumentar el timeout en `src/services/api.ts`:
```typescript
timeout: 30000, // 30 segundos
```

---

**¿Necesitas ayuda?** Abre un issue en GitHub o consulta la documentación de la API.
