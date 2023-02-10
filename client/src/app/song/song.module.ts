import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';



@NgModule({
  declarations: [
    CatalogComponent,
    ProfileComponent,
    CreateComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SongModule { }
