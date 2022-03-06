import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { FormsModule } from '@angular/forms';
import { ConversationComponent } from './conversation/conversation.component';
import { MessageViewComponent } from './message-view/message-view.component';
import { ContactComponent } from './contact/contact.component';
import { ChatComponent } from './chat/chat.component';
import { SendMessageComponent } from './send-message/send-message.component';


@NgModule({
  declarations: [
    ConversationComponent,
    MessageViewComponent,
    ContactComponent,
    ChatComponent,
    SendMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
