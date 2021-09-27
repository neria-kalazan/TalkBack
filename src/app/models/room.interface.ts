import { IMessage } from ".";
import { IUser } from ".";

export interface IRoom {
	id: string;
	roomName: string;
	users: Array<IUser>;
	messages: Array<IMessage>;
	createdUserId: string;
}