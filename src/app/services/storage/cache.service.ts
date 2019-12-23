import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  constructor(
    private nativeStorage: NativeStorage,
  ) { }

  setCacheApi(myitem, data) {

    if (!data) {
      data = { property: 'value', anotherProperty: 'anotherValue' };
    }

    this.nativeStorage.setItem(myitem, data)
      .then(
        () => {
          let recorded = this.getCacheApi(myitem);
          console.log('Stored item');
        },
        error => console.error('Error storing item', error)
      );
  }

  async getCacheApi(myitem) {

    let codeInfo = this.nativeStorage.getItem(myitem)
      .then(
        (data) => {
          return data;
        },
        error => console.error('Error storing item', error)
      );

    return codeInfo;

  }

}
