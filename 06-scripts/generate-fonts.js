const fs = require('fs');
const path = require('path');

function generateFontCss(directory) {
  const fontFolders = fs.readdirSync(directory);

  fontFolders.forEach((fontFolder) => {
    const fontDir = path.join(directory, fontFolder);
    if (!fs.statSync(fontDir).isDirectory()) return;

    const staticDir = path.join(fontDir, 'static');
    const searchDir = fs.existsSync(staticDir) ? staticDir : fontDir;

    const fontFiles = fs.readdirSync(searchDir).filter(f => f.endsWith('.ttf'));
    if (fontFiles.length === 0) return;

    const cssOutput = [];
    const groups = [
      { range: '100 400', names: ['Thin', 'ExtraLight', 'Light', 'Regular'] },
      { range: '500', names: ['Medium'] },
      { range: '600 700', names: ['SemiBold'] },
      { range: '700 900', names: ['Bold', 'Black'] }
    ];

    groups.forEach(({ range, names }) => {
      const normal = fontFiles.find(f => names.some(n => new RegExp(`${n}(?!Italic)`, 'i').test(f)));
      const italic = fontFiles.find(f => names.some(n => new RegExp(`${n}Italic`, 'i').test(f)));

      if (normal) {
        cssOutput.push(`@font-face {
  font-family: '${fontFolder}';
  src: url('./${fs.existsSync(staticDir) ? 'static/' : ''}${normal}') format('truetype');
  font-weight: ${range};
  font-style: normal;
  font-display: swap;
}`);
      }
      if (italic) {
        cssOutput.push(`@font-face {
  font-family: '${fontFolder}';
  src: url('./${fs.existsSync(staticDir) ? 'static/' : ''}${italic}') format('truetype');
  font-weight: ${range};
  font-style: italic;
  font-display: swap;
}`);
      }
    });

    // Si no se generó nada, crear fallback con todos los .ttf encontrados
    if (cssOutput.length === 0) {
      fontFiles.forEach(file => {
        const fontName = path.basename(file, '.ttf');
        const fontWeight = getFontWeight(fontName);
        const fontStyle = /Italic/i.test(fontName) ? 'italic' : 'normal';
        cssOutput.push(`@font-face {
  font-family: '${fontFolder}';
  src: url('./${fs.existsSync(staticDir) ? 'static/' : ''}${file}') format('truetype');
  font-weight: ${fontWeight};
  font-style: ${fontStyle};
  font-display: swap;
}`);
      });
    }

    const cssPath = path.join(fontDir, 'font.css');
    fs.writeFileSync(cssPath, cssOutput.join('\n\n'), { flag: 'w' });
    console.log(`✔ Generado: ${cssPath}`);
  });

  // Crear índice de imports por categoría
  const imports = fontFolders.map(f => `@import url('./${f}/font.css');`).join('\n');
  fs.writeFileSync(path.join(directory, 'font.css'), imports, { flag: 'w' });
}

function getFontWeight(name) {
  const weightMap = {
    Thin: 100,
    ExtraLight: 200,
    Light: 300,
    Regular: 400,
    Book: 400,
    Medium: 500,
    SemiBold: 600,
    Bold: 700,
    ExtraBold: 800,
    Black: 900,
  };
  for (const key in weightMap) {
    if (new RegExp(key, 'i').test(name)) return weightMap[key];
  }
  return 400;
}

function generateAllCss() {
  const fontDirs = ['sans', 'serif', 'mono', 'display'];
  fontDirs.forEach((category) => {
    const fontDir = path.join('02-css', '00-assets', 'fonts', category);
    if (fs.existsSync(fontDir)) generateFontCss(fontDir);
  });
}

generateAllCss();
