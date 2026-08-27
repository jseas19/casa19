# 🖨️ Guía: Cómo Imprimir el Calendario (Ilse.md)

Esta guía explica las diferentes formas de imprimir o exportar a PDF el archivo [Ilse.md](Ilse.md) manteniendo todo el formato visual (tablas, negritas, separadores y emojis).

---

## 📌 Método 1: Desde el editor (VS Code / Antigravity) — *Recomendado*

1. **Abrir la vista previa renderizada:**
   - Abre el archivo [`Ilse.md`](Ilse.md).
   - Presiona el atajo: `Ctrl + Shift + V` (o `Ctrl + K, V` para verla en panel lateral).
   - Alternativamente, haz clic en el icono **Open Preview to the Side** en la esquina superior derecha del editor.
2. **Exportar / Imprimir:**
   - Con la extensión **Markdown PDF** o **Markdown Preview Enhanced**:
     - Haz clic derecho dentro del archivo y selecciona **Markdown PDF: Export (pdf)** o **Open in Browser**.
   - Desde el navegador abierto con la vista previa, presiona `Ctrl + P`.

---

## 🌐 Método 2: Desde el Navegador Web (GitHub)

1. Abre tu repositorio en GitHub desde Google Chrome o Microsoft Edge.
2. Navega hasta el archivo `docs/Ilse/Ilse.md` (se mostrará renderizado con tablas y formato).
3. Presiona `Ctrl + P` (Imprimir).
4. Configura los parámetros de impresión:
   - **Destino:** Tu impresora física o *Guardar como PDF*.
   - **Más ajustes / Opciones:** Marca la casilla **"Gráficos en segundo plano"** (*Background graphics*) para que los estilos y sombreados de las tablas se impriman correctamente.
5. Haz clic en **Guardar** o **Imprimir**.

---

## 📄 Método 3: Copiar a Microsoft Word o Google Docs

1. Abre la vista previa renderizada en el editor o en GitHub.
2. Selecciona todo el contenido renderizado (`Ctrl + A`) y cópialo (`Ctrl + C`).
3. Abre un documento en blanco en **Microsoft Word** o **Google Docs** y pega el contenido (`Ctrl + V`).
4. Ajusta el diseño o márgenes según tus preferencias.
5. Imprime normalmente (`Ctrl + P`).

---

## 💻 Método 4: Por Línea de Comandos (CLI a PDF)

Si tienes Node.js instalado, puedes generar el PDF automáticamente desde la terminal:

```powershell
npx md-to-pdf "docs/Ilse/Ilse.md"
```

Esto generará automáticamente el archivo `Ilse.pdf` en la misma carpeta listo para imprimir.
