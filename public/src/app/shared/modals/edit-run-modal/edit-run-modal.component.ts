import { Component, OnInit, HostListener } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { RunService } from '../../../services/run.service';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'ngx-edit-run-modal',
  templateUrl: './edit-run-modal.component.html',
  styleUrls: ['./edit-run-modal.component.scss']
})
export class EditRunModalComponent implements OnInit {

  modalHeader: string;
  modalContent: string;

  run;
  runId: any;
  ngOnInit() {
    this.runService.getRunInfo(this.runId)
    .then(run => {
      this.run = run;
      this.run.events = JSON.parse(this.run.events);
    });
    
  }

  constructor(private activeModal: NgbActiveModal,
    private translateService: TranslateService,
    private runService: RunService,
    private notificationsService: NotificationsService) { }

  closeModal(confirmation: boolean) {
    if (confirmation) {
      this.runService.validateRunWithPoint(this.run)
      .then(res => {
        this.run.status = 'validated';
        this.run.cardStatus = '';
        this.notificationsService.success('RACE_VALIDATED');
      })
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
    }
    this.activeModal.close(confirmation);
  }


  @HostListener('document:keydown.enter', ['$event']) onEnter(event: KeyboardEvent) {
    this.closeModal(true);
  }

}


