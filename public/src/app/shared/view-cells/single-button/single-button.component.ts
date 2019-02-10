import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'ngx-single-button',
  templateUrl: './single-button.component.html',
  styleUrls: ['./single-button.component.scss']
})
export class SingleButtonComponent implements OnInit {
  internalKey: string;
  constructor(private modalService: ModalService) { }

  ngOnInit() {
  }

  onClick() {
    if (this.internalKey === 'openRolesModal') {
      this.modalService.alert('ciao', 'miao');
    }
  }

}
