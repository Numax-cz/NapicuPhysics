import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import {StatusBar, Style} from "@capacitor/status-bar";
import {NativeAudio} from "@capacitor-community/native-audio";
import {error} from "@angular/compiler-cli/src/transformers/util";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public static readonly SUCCESS_AUDIO_ID: string = "success";
  public static readonly ERROR_AUDIO_ID: string = "error";

  constructor(private platform: Platform) {
    this.platform.ready().then(() => {
      let success_audio_path: string = "assets/sounds/success.mp3";
      let error_audio_path: string = "assets/sounds/error.mp3";

      if(this.platform.is("ios") || this.platform.is("android")) {
        success_audio_path = "public/" + success_audio_path;
        error_audio_path = "public/" + error_audio_path;
      }

      NativeAudio.preload({
        assetId: AppComponent.SUCCESS_AUDIO_ID,
        assetPath: success_audio_path,
        audioChannelNum: 1,
        isUrl: false,
        volume: 0.4
      });

      NativeAudio.preload({
        assetId: AppComponent.ERROR_AUDIO_ID,
        assetPath: error_audio_path,
        audioChannelNum: 1,
        isUrl: false,
        volume: 0.1
      });


      if(this.platform.is("android")) {
        StatusBar.setOverlaysWebView({overlay: true});
        StatusBar.setStyle({style: Style.Default});
      }
    });
  }
}
