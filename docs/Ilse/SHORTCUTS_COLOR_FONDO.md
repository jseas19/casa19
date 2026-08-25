# 🎨 Guía y Atajos de Teclado: Cambiar el Color de Fondo

Esta guía contiene los atajos de teclado y métodos para cambiar el color de fondo tanto en el editor (**VS Code / Antigravity**) como en la vista previa de Markdown, en el navegador y en Windows.

---

## ⚡ 1. Atajos en VS Code / Antigravity IDE

### 🎨 Cambiar el Tema de Color (Modo Claro / Oscuro / Temas)
* **Atajo directo:** Presiona `Ctrl + K` y luego suelta y presiona `Ctrl + T`.
* **Desde la Paleta de Comandos:**
  1. Presiona `Ctrl + Shift + P`.
  2. Escribe `Preferences: Color Theme` (o `Tema de color`) y presiona `Enter`.
  3. Usa las flechas `↑` y `↓` para previsualizar los colores de fondo y presiona `Enter` para elegir uno (ej. *Default Dark+*, *Default Light+*, *Monokai*, *Quiet Light*).

---

### 🛠️ Personalizar un Color de Fondo Específico (Hexadecimal)
Si deseas un color de fondo exacto (por ejemplo, blanco puro `#ffffff` o negro profundo `#000000`):

1. Presiona `Ctrl + ,` para abrir **Settings** (Configuración).
2. Presiona el icono de **Open Settings (JSON)** arriba a la derecha (o presiona `Ctrl + Shift + P` y escribe `Preferences: Open User Settings (JSON)`).
3. Agrega o edita el bloque `workbench.colorCustomizations`:

```json
"workbench.colorCustomizations": {
  "editor.background": "#1e1e1e",
  "sideBar.background": "#252526",
  "activityBar.background": "#333333"
}
```

---

## 📑 2. Cambiar Fondo en Documentos Markdown / Impresión

### Opción A: Usar contenedor HTML con color personalizado
Puedes envolver secciones o tablas de tu archivo `.md` dentro de una etiqueta `<div>` con estilo:

```html
<div style="background-color: #f9f9f9; color: #333333; padding: 15px; border-radius: 8px;">

<!-- Tu contenido o tabla aquí -->

</div>
```

### Opción B: Cambiar fondo en la Vista Previa
* **Atajo para abrir vista previa:** `Ctrl + Shift + V`
* Las extensiones como *Markdown Preview Enhanced* permiten cambiar el tema de la vista previa haciendo clic derecho en la vista previa $\rightarrow$ **Preview Theme** $\rightarrow$ seleccionar tema claro/oscuro.

---

## 🌐 3. Cambiar Tema de Fondo en GitHub (Navegador)

1. En GitHub, haz clic en tu foto de perfil (esquina superior derecha).
2. Selecciona **Settings** $\rightarrow$ **Appearance**.
3. Elige entre **Single theme** o **Sync with system** (Light default, Dark default, Dark dimmed, etc.).

---

## 🖥️ 4. Atajos de Accesibilidad de Windows para Invertir Colores

* **Filtros de Color / Invertir (si está habilitado):** `Windows + Ctrl + C`
* **Lupa de Windows e Inversión:**
  * Abrir Lupa: `Windows + +`
  * Invertir colores de toda la pantalla: `Ctrl + Alt + I`
  * Cerrar Lupa: `Windows + Esc`
