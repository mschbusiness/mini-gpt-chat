# 🤖 Mini-GPT Chat

Eine einfache, moderne Chat-Anwendung mit OpenAI GPT-Integration - gebaut mit reinem HTML, CSS und JavaScript.

[![Build Status](https://github.com/username/mini-gpt-chat/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/username/mini-gpt-chat/actions)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open%20App-brightgreen)](https://username.github.io/mini-gpt-chat/)

## ✨ Features

- 🚀 **Schnell & Einfach** - Keine Build-Tools, reines HTML/CSS/JS
- 🔐 **Sichere API-Key Verwaltung** - Lokale Speicherung im Browser
- 💬 **Echtzeit-Chat** - Direkte OpenAI GPT-Integration
- 🎨 **Modernes Design** - Responsive UI mit Chat-Bubbles
- ⚡ **Sofort einsatzbereit** - Keine Installation erforderlich
- 🧪 **Vollständig getestet** - DOM-Tests und API-Integration-Tests

## 🚀 Live Demo

**[➡️ Jetzt testen](https://username.github.io/mini-gpt-chat/)**

## 🛠️ Lokale Entwicklung

### Voraussetzungen

- Node.js 18+ 
- OpenAI API-Key

### Setup

```bash
# Repository klonen
git clone https://github.com/username/mini-gpt-chat.git
cd mini-gpt-chat

# Dependencies installieren
npm install

# Tests ausführen
npm test

# Mit API-Key testen
OPENAI_API_KEY=sk-... npm test
```

### Lokale Ausführung

```bash
# Einfach die index.html in einem Browser öffnen
# Oder mit einem lokalen Server:
npx serve .
```

## 🔧 API-Key Konfiguration

1. **OpenAI API-Key erhalten:**
   - Gehen Sie zu [OpenAI Platform](https://platform.openai.com/api-keys)
   - Erstellen Sie einen neuen API-Key

2. **In der App verwenden:**
   - Öffnen Sie die Anwendung
   - Geben Sie Ihren API-Key in das entsprechende Feld ein
   - Klicken Sie "Save Key" (wird im Browser gespeichert)

## 🧪 Testing

```bash
# DOM-Tests (ohne Netzwerk)
npm test

# Integration-Test mit echter API
OPENAI_API_KEY=sk-... npm test
```

### Test-Coverage

- ✅ **DOM-Smoke-Tests** - UI-Elemente und Interaktionen
- ✅ **Integration-Tests** - Echte OpenAI API-Calls
- ✅ **Error-Handling** - Fehlerbehandlung und Validierung

## 🏗️ Deployment

### Automatisches Deployment

Das Projekt ist für automatisches Deployment mit GitHub Actions konfiguriert:

- **Push zu `main`** → Automatisches Build & Deploy
- **Tests** → Werden vor jedem Deployment ausgeführt
- **GitHub Pages** → Statische Hosting-Lösung

### Manuelles Deployment

```bash
# Alle Dateien committen
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

## 📁 Projektstruktur

```
mini-gpt-chat/
├── index.html          # Haupt-HTML-Datei
├── styles.css          # CSS-Styling
├── app.js             # JavaScript-Logik
├── app.test.js        # Test-Suite
├── package.json       # Dependencies
├── vitest.config.js   # Test-Konfiguration
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions
```

## 🔒 Sicherheit

- ✅ **Keine API-Keys im Code** - Alle Keys werden lokal gespeichert
- ✅ **HTTPS-Only** - Sichere Verbindungen
- ✅ **Input-Validierung** - Schutz vor XSS
- ✅ **Error-Handling** - Sichere Fehlerbehandlung

## 🛡️ Best Practices

- **TDD-Entwicklung** - Tests zuerst, dann Implementation
- **Keine Mocks** - Echte API-Integration-Tests
- **Minimale Kosten** - Kurze Prompts, günstiges Modell
- **Responsive Design** - Mobile-first Ansatz

## 🤝 Contributing

1. Fork das Repository
2. Erstellen Sie einen Feature-Branch (`git checkout -b feature/AmazingFeature`)
3. Committen Sie Ihre Änderungen (`git commit -m 'Add some AmazingFeature'`)
4. Pushen Sie zum Branch (`git push origin feature/AmazingFeature`)
5. Öffnen Sie einen Pull Request

## 📝 Lizenz

Dieses Projekt steht unter der MIT-Lizenz. Siehe [LICENSE](LICENSE) für Details.

## 🙏 Danksagungen

- [OpenAI](https://openai.com/) für die GPT-API
- [Vitest](https://vitest.dev/) für das Test-Framework
- [Happy-DOM](https://github.com/capricorn86/happy-dom) für DOM-Testing

---

**Entwickelt mit ❤️ und modernen Web-Standards**
