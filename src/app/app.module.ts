import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import { HeaderComponent } from './components/header/header.component';
import { ChatComponent } from './components/chat/chat.component';
import { ContactListComponent } from './components/chat/contact-list/contact-list.component';
import { AddGroupComponent } from './components/chat/add-group/add-group.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ChatRoomComponent } from './components/chat/chat-room/chat-room.component';
import { AddRoomModalComponent } from './components/modals/add-room-modal/add-room-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ChatComponent,
    ContactListComponent,
    AddGroupComponent,
    HomeComponent,
    NotFoundComponent,
    ChatRoomComponent,
    AddRoomModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
