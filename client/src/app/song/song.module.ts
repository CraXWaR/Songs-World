import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';



@NgModule({
  declarations: [
    CatalogComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SongModule { }
