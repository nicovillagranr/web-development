// 05 — Atributos de pantalla, navegador y ubicación
// TS: screen, navigator y window.location son objetos tipados en lib DOM.
// Se usa document.writeln para escribir en el documento al cargar.

// Atributos de pantalla
document.write('<h3>Pantalla</h3>' + '<br>');
document.writeln('<pre>alto: ' + screen.height);
document.writeln('ancho: ' + screen.width);
document.writeln('color: ' + screen.colorDepth);
document.writeln('resolución: ' + screen.pixelDepth);
document.writeln('alto disponible: ' + screen.availHeight);
document.writeln('ancho disponible: ' + screen.availWidth + '</pre>');

// Atributos de navegador (appCodeName, appName, appVersion son deprecated en DOM moderno)
document.write('<h3>Navegador</h3>' + '<br>');
document.writeln('<pre>Nombre del código del navegador: ' + navigator.appCodeName);
document.writeln('nombre el navegador: ' + navigator.appName);
document.writeln('versión del navegador: ' + navigator.appVersion);
document.writeln('lenguaje del navegador: ' + navigator.language);
document.writeln('Plataforma: ' + navigator.platform);
document.writeln('Cookies: ' + navigator.cookieEnabled);
document.writeln('Geolocalización: ' + navigator.geolocation); // propiedad correcta en TS
document.writeln('En línea: ' + navigator.onLine);
document.writeln('Motor del navegador: ' + navigator.product);
document.writeln('Agente de usuario: ' + navigator.userAgent + '</pre>');

// Atributos de ubicación
document.write('<h3>Ubicación y sus atributos</h3>' + '<br>');
document.writeln('<pre>Punto de anclaje de URL: ' + window.location.hash);
document.writeln('Host: ' + window.location.host);
document.writeln('Host de la URL: ' + window.location.hostname); // hostname, no hostName
document.writeln('URL: ' + window.location.href);
document.writeln('Protocolo: ' + window.location.protocol);
document.writeln('Búsqueda: ' + window.location.search + '</pre>');
