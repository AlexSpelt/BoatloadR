import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './shared/components';

import { MainWindowComponent } from './main-window/main-window.component';
import { PackageComponent } from "./package/package.component";
import { ConnectorComponent } from "./connector/connector.component";
import { BuildsComponent } from "./builds/builds.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: MainWindowComponent
  },
  {
    path: 'packages',
    component: PackageComponent
  },
  {
    path: 'connector',
    component: ConnectorComponent
  },
  {
    path: 'builds',
    component: BuildsComponent
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
