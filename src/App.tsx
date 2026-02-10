// src/App.tsx
import React, { useState } from 'react';
import { Sidebar, NavigationItem } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { Dashboard } from '@/pages/Dashboard';
import { ETLStatus } from '@/pages/ETLStatus';
import { Statistics, Reports, Settings } from '@/pages/OtherPages';

/**
 * Componente principal de la aplicación
 * Maneja layout, navegación y renderizado de páginas
 */
function App() {
  const [activePage, setActivePage] = useState<NavigationItem>('dashboard');

  /**
   * Mapeo de páginas a componentes
   */
  const pageComponents: Record<NavigationItem, React.ReactNode> = {
    dashboard: <Dashboard />,
    statistics: <Statistics />,
    'etl-status': <ETLStatus />,
    reports: <Reports />,
    settings: <Settings />,
  };

  /**
   * Mapeo de páginas a títulos y subtítulos
   */
  const pageTitles: Record<NavigationItem, { title: string; subtitle?: string }> = {
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Visión general de las métricas del proceso ETL',
    },
    statistics: {
      title: 'Estadísticas Avanzadas',
      subtitle: 'Análisis detallado de rendimiento y tendencias',
    },
    'etl-status': {
      title: 'Estado de Ejecuciones ETL',
      subtitle: 'Historial y monitoreo de procesos',
    },
    reports: {
      title: 'Reportes',
      subtitle: 'Generación y descarga de informes',
    },
    settings: {
      title: 'Configuración',
      subtitle: 'Parámetros del sistema y preferencias',
    },
  };

  /**
   * Handler para navegación entre páginas
   */
  const handleNavigation = (page: NavigationItem) => {
    setActivePage(page);
  };

  /**
   * Handler para refresh de datos (ejemplo)
   */
  const handleRefresh = () => {
    console.log('Refreshing data...');
    // Aquí se puede implementar lógica de refresh según la página activa
  };

  const currentPageInfo = pageTitles[activePage];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar activeItem={activePage} onNavigate={handleNavigation} />

      {/* Main content area */}
      <div className="ml-64">
        {/* Header */}
        <Header
          title={currentPageInfo.title}
          subtitle={currentPageInfo.subtitle}
          onRefresh={handleRefresh}
        />

        {/* Page content */}
        <main className="p-8">
          {pageComponents[activePage]}
        </main>
      </div>
    </div>
  );
}

export default App;
