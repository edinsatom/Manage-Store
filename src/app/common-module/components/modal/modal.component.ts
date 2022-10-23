import { Component, EventEmitter, Output } from '@angular/core';
import { NotificationModel } from '../../models/notification.model';

@Component({
  selector: 'cc-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() response: EventEmitter<boolean> = new EventEmitter();

  showConfirmModal: boolean = false;
  showNotification: boolean = false;
  notification: NotificationModel = {};

  showModal(title: string = '', message: string = '', footer: string = '') 
  {

    this.notification.title = title;
    this.notification.message = message;
    this.notification.footer = footer;

    this.showNotification = true;
  }

  showConfirm( data: NotificationModel ): void {
    this.notification = data;

    this.showConfirmModal = true;
  }

  confirmResponse(resp: boolean) {
    this.response.emit(resp);

    this.showConfirmModal = false;
  }


}
