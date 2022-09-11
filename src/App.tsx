import { Component, createSignal, lazy, onMount } from 'solid-js';

import { useRoutes } from '@solidjs/router';
import styles from './App.module.css';
import { login, getMails, getProfile } from './lib/services/office365/msal';
import MailPreview from './components/MailPreview/index';

const signIn = async () => {
  const response = await login();
  console.log(response);
}

const routes = [
  {
    path: '/',
    component: lazy(() => import('./features/home')),
  },
  {
    path: '/api/oauth',
    component: lazy(() => import('./features/home')),
  }
]

const App: Component = () => {
  const [mails, setMails] = createSignal([]);
  const Routes = useRoutes(routes);

  onMount(async () => {
    const response = await getMails();
    setMails(response.value);
  })
  return (
    <>
      <Routes />
    </>
  );
};

export default App;
