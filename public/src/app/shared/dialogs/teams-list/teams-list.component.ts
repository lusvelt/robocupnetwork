import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../../services/team.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-select-teams',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.scss']
})
export class TeamsListComponent implements OnInit {

  @Input() title: string;
  @Input() oldTeams: any[];

  teams: any = [];

  constructor(private teamService: TeamService,
              private ref: NbDialogRef<TeamsListComponent>) { }

  ngOnInit() {
    this.teamService.getTeamsInManifestation()
    .then(teams => {
       this.teams = teams.map(team => {
        const oldTeam = this.oldTeams.find(el => el.id === team.id);
        if (oldTeam)
          team.selected = true;
        return team;
      });
      this.teams = teams;
    });

    this.getNotifiedForTeams(this.teams);
  }

  getNotifiedForTeams(teamsArray: any[]) {
    this.teamService.notify('createTeam')
      .subscribe(team => teamsArray.push(team));

    this.teamService.notify('editTeam')
      .subscribe(team =>
        teamsArray.splice(teamsArray.findIndex(el => el.id === team.id), 1, team));

    this.teamService.notify('removeTeam')
      .subscribe(team =>
        teamsArray.splice(teamsArray.findIndex(el => el.id === team.id), 1));
  }

  cancel() {
    this.ref.close();
  }

  submit(teams) {
    teams = teams.filter((team: any) => team.selected);
    this.ref.close(teams);
  }

}
