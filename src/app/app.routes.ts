import { Routes } from '@angular/router';
import { WorkArea } from './components/work-area/work-area';
import { Home } from './components/home/home';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'work-area', component: WorkArea }
];
