import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddGroupComponent } from './add-group/add-group.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatComponent } from './chat.component';
import { ContactListComponent } from './contact-list/contact-list.component';

const routes: Routes = [
	{
		path: '',
		component: ChatComponent,
	},
	{
		path: ':roomId',
		component: ChatComponent,
	},
	// {
	// 	path: 'contact-list',
	// 	component: ContactListComponent,
	// },
	// {
	// 	path: 'chat-room',
	// 	component: ChatRoomComponent,
	// },
	// {
	// 	path: 'add-group',
	// 	component: AddGroupComponent,
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class CahtRoutingModule { }
