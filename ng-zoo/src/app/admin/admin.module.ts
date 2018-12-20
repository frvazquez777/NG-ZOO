//Modulos
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { AdminRoutingModule } from './admin.rouring.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//componentes
import { MainComponent } from './components/main/main.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { ListComponent } from './components/list/list.component';

//servicios guard
import { AdminGuard } from '../services/admin.guard';
import { UserService } from '../services/user.service';

//Pipe
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
    declarations: [
        MainComponent,
        ListComponent,
        AddComponent,
        EditComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdminRoutingModule,
        BrowserAnimationsModule
    ],
    exports: [],
    providers: [UserService, AdminGuard]
})
export class AdminModule {

}
