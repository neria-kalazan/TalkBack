import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IMessage, IRoom } from 'src/app/models';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { AddRoomModalComponent } from '../modals/add-room-modal/add-room-modal.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();
  private userId: string = '';

  public rooms$: Observable<Array<IRoom>>;
  public messages$: Observable<Array<IMessage>>;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.rooms$ = chatService.getRooms();
    const roomId: string = this.activatedRoute.snapshot.url[1]?.path;
    this.messages$ = chatService.getRoomMessages(roomId);

    this.subscription.add(
      router.events
        .pipe(filter((data) => data instanceof NavigationEnd))
        .subscribe((data) => {
          const routeEvent: RouterEvent = data as RouterEvent;
          const urlArr = routeEvent.url.split('/');
          if (urlArr.length > 2) {
            this.messages$ = chatService.getRoomMessages(urlArr[2]);
          }
        })
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.authService.getUserDetails().pipe(filter(data => !!data)).subscribe(user => {
        this.userId = user.uid;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public addRoomModal() :void {
    const dialogRef = this.dialog.open(AddRoomModalComponent, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(roomName => {
      console.log('The dialog was closed', roomName);
      this.onAddRoom(roomName, this.userId);
    });
  }

  public onAddRoom(roomName: string, userId: string) {
    this.chatService.addRoom(roomName, userId);
  }

}
