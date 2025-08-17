import { Routes } from '@angular/router';
import { WorkArea } from './components/work-area/work-area';

export const routes: Routes = [
    { path: '', redirectTo: '/work-area', pathMatch: 'full' },
    { path: 'work-area', component: WorkArea }
];
