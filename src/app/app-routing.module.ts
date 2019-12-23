import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'detalhe-code',
    loadChildren: () => import('./pages/detalhe-code/detalhe-code.module').then( m => m.DetalheCodePageModule)
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./pages/qrcode/qrcode.module').then( m => m.QrcodePageModule)
  },
  {
    path: 'modelo',
    loadChildren: () => import('./pages/modelo/modelo.module').then( m => m.ModeloPageModule)
  },
  {
    path: 'midias',
    loadChildren: () => import('./pages/midias/midias.module').then( m => m.MidiasPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
