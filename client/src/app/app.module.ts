import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule, MatCardModule, MatRadioModule, MatListModule } from '@angular/material';


import { AppComponent } from './app.component';
import { VideoCallComponent } from './video-call/video-call.component';
import { TwilioService } from './twilio.service';


@NgModule({
  declarations: [
    AppComponent,
    VideoCallComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule, MatInputModule, MatButtonModule, MatGridListModule, MatCardModule, MatRadioModule, MatListModule,
    BrowserAnimationsModule
  ],
  providers: [TwilioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
