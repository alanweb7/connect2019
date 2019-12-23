import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-midias',
  templateUrl: './midias.page.html',
  styleUrls: ['./midias.page.scss'],
})
export class MidiasPage implements OnInit {

  private title_page: String;
  public headerStyle: any;
  private headerClass: any;
  private contentStyle: any;
  public infoData: any;
  public typeData: any;
  // Data passed in by componentProps
  @Input() type: string;
  @Input() data: any;
  @Input() middleInitial: string;

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) {
    // componentProps can also be accessed at construction time using NavParams
    console.log(navParams.get('type'));
    this.typeData = navParams.get('type');
    this.getStyle();
  }


  ngOnInit() {
  }

  async closeModal() {
    const result: Date = new Date();

    await this.modalController.dismiss(result);
  }

  getStyle() {

    let type = this.navParams.get('type');
    this.infoData = this.navParams.get('data');

    let myStyle: any = {};

    if (!type) {
      type = 'Mídias';
    }

    switch (type) {
      case 'audio':
        this.headerClass = 'audio_content';

        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_audio.png\')',
        };

        this.title_page = 'Coleção de Audios';

        break;
      case 'doc':
        this.title_page = 'Coleção de Documentos';
        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_doc.png\')',
        };
        break;
      case 'hotspot':
        this.title_page = 'Hotspot (Wi-Fi)';

        break;
      case 'chat':
        this.title_page = 'Bate-papo do canal';
        this.headerStyle = {
          'background-image': 'url(\'../../assets/imgs/back_chat.png\')',
        };
        break;

      default:
        break;
    }

  }

}
