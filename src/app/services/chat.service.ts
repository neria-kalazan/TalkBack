import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IMessage, IRoom } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(
    private _db: AngularFirestore
  ) { }

  public getRooms(): Observable<Array<IRoom>> {
    return this._db.collection('rooms').snapshotChanges().pipe(map(snaps => {
      return snaps.map(snap => {
        const data: IRoom = <IRoom>snap.payload.doc.data();
        return <IRoom>{
          ...data,
          id: snap.payload.doc.id
        }
      })
    }))
  }

  public getRoomMessages(roomId: string): Observable<Array<IMessage>> {
    return this._db.collection('rooms').doc(roomId).collection('messages').snapshotChanges().pipe(map(messages => {
      return messages.map(message => {
        const data: IMessage = <IMessage>message.payload.doc.data();
        return {
          ...data,
          id: message.payload.doc.id
        }
      })
    }))
  }

  public addRoom(roomName: string, userId: string): void {
    this._db.collection('rooms').add({
      roomName,
      createdUserId: userId
    })
  }



  /**
   * methods:
   * 
   * get rooms
   * add room
   * get room messages
   * send message
   * delete room
   * 
   */

}
