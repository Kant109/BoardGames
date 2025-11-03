<template>
  <div id="app">
    <!-- En-tête de l'application -->
    <header class="app-header">
      <div class="header-content">
        <h1 class="app-title">🎲 Jeux de Société</h1>
        <p class="app-subtitle">
          Découvrez notre collection de jeux pour vos soirées !
        </p>
      </div>
    </header>

    <!-- Grille des jeux -->
    <main class="app-main">
      <router-view />
    </main>

    <!-- Pied de page -->
    <footer class="app-footer">
      <p>
        💡 <strong>Astuce:</strong> Vos favoris sont sauvegardés automatiquement
        dans votre navigateur
      </p>
    </footer>
  </div>
</template>

<style>
/* Reset et styles globaux */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* En-tête */
.app-header {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.header-content {
  max-width: 1400px;
  margin: 0 auto;
}

.app-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 8px;
  text-align: center;
}

.app-subtitle {
  text-align: center;
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 0;
}

/* Zone principale */
.app-main {
  flex: 1;
  padding-bottom: 40px;
}

/* État vide */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: white;
  border-radius: 16px;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 16px;
}

.empty-state h2 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #2c3e50;
}

.empty-state p {
  color: #7f8c8d;
  margin-bottom: 24px;
  line-height: 1.6;
}

.primary-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

/* Pied de page */
.app-footer {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px;
  text-align: center;
  color: #7f8c8d;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.app-footer p {
  max-width: 600px;
  margin: 0 auto;
}

/* Responsive */
@media (min-width: 768px) {
  .app-header {
    padding: 28px 24px;
  }

  .app-title {
    font-size: 2.5rem;
  }

  .app-subtitle {
    font-size: 1.1rem;
  }
}
</style>
