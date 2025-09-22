import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // Esta es la ruta principal (cuando abres http://localhost:8100)
    path: '',
    // Aquí le ordenamos que redirija INMEDIATAMENTE a la página de login
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    // Esta ruta es para las páginas del menú (Inbox, Spam, etc.)
    path: 'folder/:id',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
/*   {
    // Esta es la ruta que define tu página de login
    path: 'login',
    loadComponent: () => import('./login/login.page').then( m => m.LoginPage)
  }, */
];