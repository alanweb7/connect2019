import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { CacheService } from 'src/app/services/storage/cache.service';
import { ModalController, Platform } from '@ionic/angular';
import { MidiasPage } from "../midias/midias.page";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MiscService } from 'src/app/services/tools/misc.service';





@Component({
  selector: 'app-detalhe-code',
  templateUrl: './detalhe-code.page.html',
  styleUrls: ['./detalhe-code.page.scss'],
})

export class DetalheCodePage implements OnInit {
  public code: any = { album_vimeo: [] };
  public photo;
  public videoGallery;
  public videoLink: SafeResourceUrl;
  public currentId;
  public infoLegendSlides;
  public disableNext;
  public disablePrev;
  public userInfo;
  public images;
  public audios;
  public documentos;
  public sectors;
  public hotspot;
  video: HTMLElement = document.getElementById('myVideo');
  public videoInfo: any = {};
  constructor(
    private cache: CacheService,
    public modalController: ModalController,
    private platform: Platform,
    private sanitizer: DomSanitizer,
    private tools: MiscService,

  ) {

    this.currentId = 0;
    this.photo = '../../../assets/imgs/user.png';
    this.platform.ready().then(() => {
      this.tools.dismissAll();
      this.getCurrentCode();
    });


  }

  ngOnInit() {
  }

  getCurrentCode() {

    this.cache.getCacheApi('current-code').then((data) => {
      if (data) {
        this.code = data;
      }

      //popula video

      if (this.code.user_info) {
        let userInfo = this.code.user_info;
        this.photo = userInfo.card;
      }

      if (this.code.user_info) {
        let userInfo = this.code.user_info;
        this.photo = userInfo.card;
      }


      if (this.code.album_vimeo.length > 0) {
        this.videoGallery = [];

        let videos = this.code.album_vimeo;

        for (var i = 0; i < videos.length; i++) {
          let vid = videos[i];
          let img = '';
          if (vid.video_pictures) {
            img = vid.video_pictures.replace('?r=pad', '');
          }

          vid.video_pictures = img;

          if (vid.post_status == "complete") {
            vid.video_link = this.sanitizer.bypassSecurityTrustResourceUrl(vid.video_link);
          }

          this.videoGallery.push(vid);

        }

        console.log('Coleção de videos: ', this.videoGallery);
        this.getVideo();

      }



    });

  }

  async getMidiaPage(param) {

    const modal = await this.modalController.create({
      component: MidiasPage,
      componentProps: {
        'type': param,
        'data': this.code
      }
    });

    return await modal.present();

  }

  handleIFrameLoadEvent(): void {

  }


  getVideo(action = null) {


    let totalVideos = this.videoGallery.length;
    console.log('Total de vídeos: ', totalVideos);



    if (this.currentId == (totalVideos - 1)) {
      this.disableNext = true;
    }

    if (action == 'up' && this.currentId < (totalVideos - 1)) {
      this.currentId = this.currentId + 1;
    }
    else if (action == 'down' && this.currentId > 0) {
      this.currentId = this.currentId - 1;
    }
    if (this.currentId < 1) {

      this.currentId = 0;

    }


    this.infoLegendSlides = (this.currentId + 1) + '/' + (totalVideos);

    if (this.videoGallery) {
      this.videoInfo = this.videoGallery[this.currentId];
    }

    this.disablePrev = this.currentId == 0 ? true : false;
    this.disableNext = this.currentId == (totalVideos - 1) ? true : false;

    console.log('Current Vídeo: ', this.videoInfo);
    console.log('ID Atual: ', this.currentId);
  }

  doRefresh(event) {
  

    setTimeout(() => {
   
    }, 2000);
  }

}
