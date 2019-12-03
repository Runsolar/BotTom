import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import { ChatService } from './services/chat/chat.service';
import { Angular2AutoScroll } from "./chat/angular2-auto-scroll.directive";

@NgModule({
    declarations: [
        AppComponent,
        ChatComponent,
        Angular2AutoScroll
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule
    ],
    providers: [ChatService],
    bootstrap: [AppComponent]
})
export class AppModule { }
