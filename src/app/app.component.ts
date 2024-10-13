import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import {StatusBar, Style} from "@capacitor/status-bar";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      if(this.platform.is("android")) {
        StatusBar.setOverlaysWebView({overlay: true});
        StatusBar.setStyle({style: Style.Default});
      }
    });
  }
}
