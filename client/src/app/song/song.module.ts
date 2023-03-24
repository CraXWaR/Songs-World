import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateComponent } from './create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CatalogComponent,
    ProfileComponent,
    CreateComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class SongModule { }
