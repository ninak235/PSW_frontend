import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestComponent } from './request/request.component';



@NgModule({
  declarations: [
    RequestComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    RequestComponent
  ]
})
export class ClubModule { }
