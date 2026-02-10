# 🚀 GUÍA DE INSTALACIÓN PASO A PASO

## ❗ SOLUCIÓN AL ERROR DE VITE

Si te sale el error: **"vite no se reconoce como un comando interno o externo"**

Sigue estos pasos **EXACTAMENTE en este orden**:

---

## ✅ PASO 1: Verificar Node.js

Abre tu terminal (CMD, PowerShell o Git Bash) y ejecuta:

```bash
node --version
```

**Debe mostrar versión 18 o superior** (ejemplo: v18.17.0, v20.10.0)

❌ Si muestra una versión menor a 18 o da error:
1. Ve a https://nodejs.org
2. Descarga e instala la versión LTS (Long Term Support)
3. Reinicia tu computadora
4. Vuelve a verificar con `node --version`

---

## ✅ PASO 2: Navegar a la carpeta del proyecto

```bash
cd ruta/donde/descomprimiste/etl-dashboard
```

**Ejemplo en Windows:**
```bash
cd C:\Users\TuNombre\Downloads\etl-dashboard
```

**Ejemplo en Mac/Linux:**
```bash
cd ~/Downloads/etl-dashboard
```

---

## ✅ PASO 3: Limpiar caché de npm (IMPORTANTE)

```bash
npm cache clean --force
```

---

## ✅ PASO 4: Eliminar instalaciones previas (si existen)

**En Windows (PowerShell):**
```powershell
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
```

**En Windows (CMD):**
```cmd
rmdir /s /q node_modules
del package-lock.json
```

**En Mac/Linux:**
```bash
rm -rf node_modules package-lock.json
```

---

## ✅ PASO 5: Instalar dependencias (ESTO PUEDE TARDAR 2-5 MINUTOS)

```bash
npm install
```

**Deberías ver algo como:**
```
added 245 packages in 2m
```

❌ **Si da error aquí:**
- Verifica tu conexión a internet
- Desactiva temporalmente antivirus/firewall
- Ejecuta: `npm config set registry https://registry.npmjs.org/`
- Intenta de nuevo: `npm install`

---

## ✅ PASO 6: Verificar que Vite se instaló

```bash
npx vite --version
```

**Debería mostrar algo como:** `vite/5.0.8`

---

## ✅ PASO 7: Ejecutar el proyecto

```bash
npm run dev
```

**Deberías ver algo como:**
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

## 🎉 PASO 8: Abrir en el navegador

Abre tu navegador y ve a: **http://localhost:5173**

¡Deberías ver el dashboard funcionando! 🎊

---

## 🐛 SOLUCIÓN A PROBLEMAS COMUNES

### Problema 1: "npm no se reconoce"
**Solución:** Node.js no está instalado o no está en el PATH
1. Reinstala Node.js desde https://nodejs.org
2. Durante la instalación, marca "Add to PATH"
3. Reinicia tu computadora

### Problema 2: "Cannot find module"
**Solución:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Problema 3: "Permission denied" (Mac/Linux)
**Solución:**
```bash
sudo chown -R $USER ~/.npm
npm install
```

### Problema 4: Error de TypeScript
**Solución:**
```bash
npm install --save-dev typescript @types/react @types/react-dom
```

### Problema 5: Puerto 5173 ocupado
**Solución:** Usa otro puerto
```bash
npm run dev -- --port 3000
```

### Problema 6: Pantalla en blanco
**Solución:**
1. Abre la consola del navegador (F12)
2. Busca errores en rojo
3. Si dice "Failed to fetch", verifica que el servidor esté corriendo
4. Refresca la página (Ctrl + F5)

---

## 🔄 COMANDOS ÚTILES

```bash
# Iniciar servidor de desarrollo
npm run dev

# Detener el servidor
Ctrl + C

# Build para producción
npm run build

# Limpiar todo y empezar de cero
rm -rf node_modules package-lock.json dist
npm install
npm run dev
```

---

## 📞 ¿TODAVÍA NO FUNCIONA?

Si después de seguir TODOS estos pasos sigue sin funcionar:

1. **Toma una captura de pantalla** del error exacto que ves
2. **Copia y pega** el error completo de la terminal
3. **Verifica** que estés en la carpeta correcta (`pwd` en Mac/Linux o `cd` en Windows)
4. **Asegúrate** de que Node.js versión 18+ esté instalado (`node --version`)

---

## ✅ CHECKLIST FINAL

- [ ] Node.js 18+ instalado
- [ ] Estoy en la carpeta correcta del proyecto
- [ ] Ejecuté `npm cache clean --force`
- [ ] Eliminé `node_modules` y `package-lock.json`
- [ ] Ejecuté `npm install` sin errores
- [ ] `npx vite --version` muestra la versión de Vite
- [ ] `npm run dev` inicia el servidor
- [ ] Puedo ver el dashboard en http://localhost:5173

---

**Si completaste todos los checks, el proyecto DEBE funcionar.** 🚀
