import { Routes } from '@angular/router';
import { LoginComponent } from './components/core/login/login.component';
import { StudentLeavesComponent } from './components/student-leaves/student-leaves.component';

export const routes: Routes = [
    {path:'login',component:LoginComponent},
    // {path:'**',component:LoginComponent},
    {path:'',redirectTo:'/login',pathMatch:'full'},
    {path:'student-leaves',component:StudentLeavesComponent},

];
