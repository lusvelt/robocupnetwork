import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { EditRunModalComponent } from '../../../shared/modals/edit-run-modal/edit-run-modal.component';
import { confirmSettings } from '../../../config/modal.config';
import { RunService } from '../../../services/run.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'ngx-manage-run',
  templateUrl: './manage-run.component.html',
  styleUrls: ['./manage-run.component.scss']
})
export class ManageRunComponent implements OnInit {
  runs: any = [];
  cardStatus: any;
  constructor(private modalService: NgbModal,
              private runService: RunService,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
    this.runService.getRuns()
    .then(runs => {
      runs.forEach(run => {
        if (run.status === 'toBeValidated')
          run.cardStatus = 'success';

        if (run.status === 'toBeCanceled')
          run.cardStatus = 'danger';

        if (run.status === 'toBeReviewed')
          run.cardStatus = 'warning';
      });
      this.runs = runs;
    });

    this.runService.notify('startRun')
    .subscribe(run => this.runs.push(run));

    this.runService.notify('deleteRun')
      .subscribe(run => this.runs.splice(this.runs.findIndex(el => el.id === run.id), 1, run));

      this.runService.notify('validateRun')
      .subscribe(run => this.runs.splice(this.runs.findIndex(el => el.id === run.id), 1, run));

      this.runService.notify('updateLiveScore')
      .subscribe(run => this.runs.splice(this.runs.findIndex(el => el.id === run.id), 1, run));

      this.runService.notify('endRun')
      .subscribe(run => {
        if (run.status === 'toBeValidated')
                run.cardStatus = 'success';

            if (run.status === 'toBeCanceled')
            run.cardStatus = 'danger';

            if (run.status === 'toBeReviewed')
            run.cardStatus = 'warning';
        this.runs.splice(this.runs.findIndex(el => el.id === run.id), 1, run);
      });
  }

  deleteRun(run) {
    this.runService.deleteRun(run)
    .then(res => {
      run.status = 'deleted';
      run.cardStatus = '';
      this.notificationsService.success('RACE_DELETED');
    })
    .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  validateRun(run) {
    this.runService.fastValidateRun(run)
      .then(res => {
        run.status = 'validated';
        run.cardStatus = '';
        this.notificationsService.success('RACE_VALIDATED');
      })
      .catch(err => this.notificationsService.error('OPERATION_FAILED_ERROR_MESSAGE'));
  }

  openRunModal(run) {
    const modal = this.modalService.open(EditRunModalComponent);
      modal.componentInstance.run = run;
  }

}
