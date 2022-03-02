import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { ChatViewComponent } from './chat-view/chat-view.component';
import { FormsModule } from '@angular/forms';
import { ConverationComponent } from './converation/converation.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { ContactComponent } from './contact/contact.component';


@NgModule({
  declarations: [
    ChatViewComponent,
    ConverationComponent,
    MessageViewComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
