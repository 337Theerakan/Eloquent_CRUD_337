import React from 'react';
import ReactDOM from 'react-dom/client';
import { InertiaApp } from '@inertiajs/inertia-react';

const app = document.getElementById('app');
const page = JSON.parse(app.dataset.page);

ReactDOM.createRoot(app).render(
  <InertiaApp
    initialPage={page}
    resolveComponent={(name) => import(`./Pages/${name}.jsx`).then((module) => module.default)}
  />
);
