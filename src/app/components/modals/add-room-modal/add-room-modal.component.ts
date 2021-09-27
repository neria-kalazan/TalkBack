import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-room-modal',
  templateUrl: './add-room-modal.component.html',
  styleUrls: ['./add-room-modal.component.sass']
})
export class AddRoomModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddRoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public close(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
