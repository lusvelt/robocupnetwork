import { UserService } from './../../../services/user.service';
import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../../services/auth.service';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  currentManifestation: string;

   constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private translateService: TranslateService,
    private authService: AuthService,
    private modalService: ModalService) {
  }

  ngOnInit() {
    this.user = {
      name: this.userService.getFullName(),
      email: this.userService.getEmail()

    };

    this.currentManifestation = this.authService.isManifestationSelected() ? this.authService.getManifestation().name : 'NO_COMPETITONS_SELECTED';

    this.authService.onManifestationChange()
      .subscribe(manifestation => this.currentManifestation = manifestation ? manifestation.name : 'NO_COMPETITONS_SELECTED');
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  openContactsModal() {
    this.modalService.alert('CONTACT_US', 'emailacasp@caso.it');
  }

  unsetManifestation() {
    this.authService.unsetManifestation();
  }
  isManifestationSelected() {
    return this.authService.isManifestationSelected();
  }
}
