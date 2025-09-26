# 🚀 Deployment Guide

## GitHub Repository Setup

### 1. Repository erstellen
```bash
# Auf GitHub.com ein neues Repository erstellen:
# Repository Name: mini-gpt-chat
# Description: Mini-GPT Chat - Simple OpenAI Chat Application
# Public/Private: Public (für GitHub Pages)
# Initialize: Keine README, .gitignore oder License (bereits vorhanden)
```

### 2. Remote Repository hinzufügen
```bash
# Nach Repository-Erstellung auf GitHub:
git remote add origin https://github.com/USERNAME/mini-gpt-chat.git
git branch -M main
git push -u origin main
```

## GitHub Pages Konfiguration

### 1. Repository Settings
- Gehen Sie zu **Settings** → **Pages**
- **Source**: GitHub Actions
- **Branch**: main

### 2. GitHub Actions aktivieren
- Gehen Sie zu **Actions** Tab
- Aktivieren Sie GitHub Actions für das Repository
- Der Workflow wird automatisch beim ersten Push ausgeführt

## Secrets Management

### 1. OpenAI API Key (Optional für Tests)
```bash
# Repository Settings → Secrets and variables → Actions
# Neuer Secret: OPENAI_API_KEY
# Wert: sk-... (Ihr OpenAI API Key)
```

**Hinweis:** Der API-Key ist nur für Integration-Tests erforderlich. Die App funktioniert auch ohne diesen Secret.

## Automatisches Deployment

### Workflow-Trigger
- ✅ **Push zu main** → Automatisches Build & Deploy
- ✅ **Pull Requests** → Tests werden ausgeführt (kein Deploy)
- ✅ **Tests müssen bestehen** → Deployment nur bei grünen Tests

### Deployment-URL
Nach erfolgreichem Deployment:
```
https://USERNAME.github.io/mini-gpt-chat/
```

## Manuelle Deployment-Schritte

### 1. Lokale Tests
```bash
# Dependencies installieren
npm install

# Tests ausführen
npm test

# Mit API-Key testen (optional)
OPENAI_API_KEY=sk-... npm test
```

### 2. Git Workflow
```bash
# Änderungen hinzufügen
git add .

# Committen
git commit -m "feat: Add new feature"

# Pushen (löst automatisches Deployment aus)
git push origin main
```

### 3. Deployment überwachen
- **Actions Tab** → Workflow-Status überwachen
- **Pages Tab** → Deployment-Status prüfen
- **Live URL** → Funktionalität testen

## Troubleshooting

### Häufige Probleme

#### 1. Tests schlagen fehl
```bash
# Lokal testen
npm test

# Mit Debug-Informationen
npm test -- --reporter=verbose
```

#### 2. GitHub Pages nicht erreichbar
- **Settings** → **Pages** → Source auf "GitHub Actions" setzen
- **Actions** → Workflow-Status prüfen
- **Branch Protection** → Actions deaktivieren falls nötig

#### 3. API-Key Probleme
- Secret korrekt gesetzt?
- API-Key gültig und aktiv?
- OpenAI Account Limits prüfen

### Debug-Informationen

#### Workflow-Logs
```bash
# GitHub Actions → Deploy to GitHub Pages → View logs
# Nach Fehlern suchen:
# - Node.js Version
# - npm install Fehler
# - Test-Failures
# - Permission-Probleme
```

#### Lokale Debugging
```bash
# Dependencies prüfen
npm list

# Test-Umgebung
npm test -- --reporter=verbose

# Build-Simulation
npm ci
npm test
```

## Best Practices

### 1. Branch-Strategie
- **main**: Production-ready Code
- **develop**: Development Branch
- **feature/**: Feature Branches

### 2. Commit-Messages
```bash
# Konventionelle Commits
feat: Add new feature
fix: Fix bug in chat functionality
docs: Update README
test: Add integration tests
```

### 3. Security
- ✅ Keine API-Keys im Code
- ✅ Secrets für sensitive Daten
- ✅ Branch Protection Rules
- ✅ Code Reviews erforderlich

### 4. Monitoring
- **GitHub Actions** → Workflow-Status
- **GitHub Pages** → Deployment-Status
- **Repository Insights** → Traffic und Performance

## Support

Bei Problemen:
1. **Issues** → Bug Report erstellen
2. **Discussions** → Community Support
3. **Documentation** → README.md prüfen

---

**Deployment erfolgreich! 🎉**
