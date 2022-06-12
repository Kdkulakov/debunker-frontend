import {
  Component, OnDestroy,
  OnInit
} from "@angular/core";

import {DebunkerServise} from "../../services/debunker.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Item} from "../../interfaces";
import {MatSnackBar} from '@angular/material/snack-bar';
import {UtilService} from "../../services/util.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'modal-component',
  templateUrl: 'modal-component.html',
})
export class ModalComponent implements OnInit, OnDestroy {


  public items: Item[] = [];

  public name: FormControl;
  public text: FormControl;
  public url: FormControl;

  public selected: any;
  public source: FormControl;
  public param1: number = 0;
  public param2: number = 0;
  public param3: number = 0;
  public param4: number = 0;

  public isDisabled: boolean;
  public srcImgBase64_list: string[] = []
  public imagesSlider: string[] = [];
  private aSubSources: Subscription;
  public myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private debunkerServise: DebunkerServise,
              private _snackBar: MatSnackBar,
              private utilService: UtilService) {
    this.isDisabled = true;
    this.selected = {value: null, label: null};
    this.srcImgBase64_list = [];
    this.aSubSources = this.debunkerServise.getAllSources().subscribe(s => {
      s.forEach(
        value => {
          let item: Item = {};
          item.label = value.name;
          item.value = value.id;
          this.items.push(item)
        }
      )
    });
  }


  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.srcImgBase64_list.push(event.target.result);
          this.imagesSlider.push(event.target.result);
          this.myForm.patchValue({
            fileSource: this.imagesSlider
          });
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  onSourcesChange(event: any) {
    if (event !== null) {
      this.selected.value = this.findSelectedValueInItemsByLabel(event);
    }
  }

  findSelectedValueInItemsByLabel(event: any): number {
    let value = null;
    this.items.forEach(
      item => {
        if (item.label === event) {
          value = item.value
        }
      }
    )
    return value;
  }

  ngOnInit() {
    this.name = new FormControl(null, [Validators.required]);
    this.text = new FormControl(null, [Validators.required]);
    this.url = new FormControl(null, [Validators.required]);
    this.source = new FormControl(null);
  }

  onSubmit(event?: Event) {
    this.debunkerServise.createMainTopic(this.name.value, this.text.value, this.url.value, this.selected.value, this.srcImgBase64_list).subscribe(
      response => {
        this._snackBar.open('Новость отправлена на анализ', 'Закрыть', {
          duration: this.utilService.CLOSE_TIME
        });
      },
      error => this._snackBar.open('Новость не отправлена на анализ', 'Закрыть', {
        duration: this.utilService.CLOSE_TIME
      }),
    )
  }


// методы для выставления значения поля isDisabled
  changeParam1(param: any) {
    if (param !== null && !this.isEmptyOrSpaces(param)) {
      this.param1 = 1;
    } else {
      this.param1 = 0;
    }
    this.cheakActivateOk();
  }
  changeParam2(param: any) {
    if (param !== null && !this.isEmptyOrSpaces(param)) {
      this.param2 = 1;
    } else {
      this.param2 = 0;
    }
    this.cheakActivateOk();
  }
  changeParam3(param: any) {
    if (param !== null && !this.isEmptyOrSpaces(param)) {
      this.param3 = 1;
    } else {
      this.param3 = 0;
    }
    this.cheakActivateOk();
  }
  changeParam4(param: any) {
    if (param !== null && !this.isEmptyOrSpaces(param.toString())) {
      this.param4 = 1;
    } else {
      this.param4 = 0;
    }
    this.cheakActivateOk();
  }
  cheakActivateOk() {
    this.isDisabled = true;
    if (this.param1 == 1 && this.param2 == 1 && this.param3 == 1 && this.param4 == 1) {
      this.isDisabled = false;
    }
  }

  isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) !== null;
  }

  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.aSubSources) {
      this.aSubSources.unsubscribe();
    }
  }
}
