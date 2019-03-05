import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NotificationsService } from '../../services/notifications.service';

import 'rxjs/add/operator/catch';
import { UserService } from '../../services/user.service';
import { TeamComponent } from '../../pages/dashboard/team/team.component';
import { CategoriesService } from '../../services/categories.service';
@Component({
  selector: 'ngx-runsetting',
  templateUrl: './run-setting-mobile.component.html',
  styleUrls: ['./run-setting-mobile.component.scss']
})
export class RunSettingMobileComponent implements OnInit {

  constructor(private translate: TranslateService,
              private authService: AuthService,
              private router: Router,
              private notificationsService: NotificationsService,
              private userService: UserService,
              private route: ActivatedRoute,
              private categoriesService: CategoriesService) { }


  redirectDelay: number = 0;
  strategy: string = '';
  fullName: string;

  arbitratedRuns: { name: string, points: string }[] = [
    { name: 'Fenix', points: '121 pt' },
    { name: 'Jamil', points: '20 pt' },
    { name: 'Elettroncica 1', points: '40 pt' },
    { name: 'Erminio', points: '22 pt' },
    { name: 'Dellemonudo', points: '32 pt' },
  ];
  errors: string[] = [];
  messages: string[] = [];

  user: any = {};
  team: any = {};

  runsetting: any = {
    evacuationType: '',
    aliveVictim: '',
    deadVictim: '',
    lastCheckpointIsRoom: true,
    field: '',
    numberOfCheckpoints: '',
    checkpoint: []
  };

  submitted: boolean = false;
  rememberMe = false;

    ngOnInit() {
      this.fullName = this.userService.getFullName();
      const data = this.route.snapshot.params;
      this.team = JSON.parse(data.text);
      // console.log(this.team.Phases[0].id);

      this.categoriesService.findCategoryFromPhaseId(this.team.Phases[0])
      .then(category => {
        this.team.category = category;
      });
    }

    visualizza() { }

  onNumberOfCheckpointChange() {
    this.runsetting.checkpoint.length = this.runsetting.numberOfCheckpoints;
  }

  onLastCheckpointIsRoomChange() {
    if (!this.runsetting.lastCheckpointIsRoom)
      this.runsetting.checkpoint.length++;
    else
      this.runsetting.checkpoint.length--;
  }

}
