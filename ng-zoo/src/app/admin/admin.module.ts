//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin.rouring.module';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule
    ],
    exports: [],
    providers: []
})
export class AdminModule {

}