import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BarDoubleComponent } from './bar-double/bar-double.component';

import {scaleLinear} from "d3-scale";
import * as d3 from "d3";

@NgModule({
  declarations: [
    AppComponent,
    BarDoubleComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
