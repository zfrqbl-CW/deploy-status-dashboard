const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// These two values are the ones we edit between deploys later in the
// article to demonstrate Velocity's auto deploy and rollback behavior.
const APP_VERSION = 'v1.0.0';
const THEME_COLOR = '#2563eb'; // blue

const FEATURES = [
  {
    title: 'Core Deploy',
    description: 'Base application deployed straight from the connected Git repository.',
  },
];

// Read from an environment variable set later in Velocity's Settings tab.
// Left as "Not Set" until that section of the article sets it.
const ENV_LABEL = process.env.APP_ENV_LABEL || 'Not Set';

const serverStartTime = new Date().toISOString();

app.get('/', (req, res) => {
  const featureCards = FEATURES.map(
    (feature) => `
      <div class="card">
        <h3>${feature.title}</h3>
        <p>${feature.description}</p>
      </div>`
  ).join('');

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Deploy Status Dashboard</title>
  <style>
    :root { --theme-color: ${THEME_COLOR}; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #0f172a;
      color: #f1f5f9;
    }
    header {
      background: var(--theme-color);
      padding: 40px 24px;
      text-align: center;
    }
    header h1 {
      margin: 0 0 8px 0;
      font-size: 32px;
    }
    .badge {
      display: inline-block;
      background: rgba(255, 255, 255, 0.2);
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    main {
      max-width: 900px;
      margin: 0 auto;
      padding: 32px 24px;
    }
    .panel {
      background: #1e293b;
      border-radius: 12px;
      padding: 24px;
      margin-bottom: 24px;
    }
    .panel h2 {
      margin-top: 0;
      font-size: 14px;
      color: #94a3b8;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #334155;
      font-size: 15px;
    }
    .info-row:last-child { border-bottom: none; }
    .info-row span:first-child { color: #94a3b8; }
    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 16px;
    }
    .card {
      background: #1e293b;
      border: 1px solid var(--theme-color);
      border-radius: 12px;
      padding: 20px;
    }
    .card h3 {
      margin: 0 0 8px 0;
      color: var(--theme-color);
    }
    .card p {
      margin: 0;
      font-size: 14px;
      color: #cbd5e1;
    }
  </style>
</head>
<body>
  <header>
    <h1>Deploy Status Dashboard</h1>
    <span class="badge">${APP_VERSION}</span>
  </header>
  <main>
    <div class="panel">
      <h2>Build Info</h2>
      <div class="info-row"><span>Node Version</span><span>${process.version}</span></div>
      <div class="info-row"><span>Environment</span><span>${process.env.NODE_ENV || 'production'}</span></div>
      <div class="info-row"><span>Env Label</span><span>${ENV_LABEL}</span></div>
      <div class="info-row"><span>Server Start</span><span>${serverStartTime}</span></div>
    </div>
    <div class="cards">
      ${featureCards}
    </div>
  </main>
</body>
</html>`;

  res.send(html);
});

app.listen(PORT, () => {
  console.log(`Deploy status dashboard running on port ${PORT}`);
});
