import {
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DebunkerServise} from "../../shared/services/debunker.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Subscription} from "rxjs";
import {UtilService} from "../../shared/services/util.service";

// Кастомная компонента модального окна,которое вызывается из блока оценок нейросети
@Component({
  selector: 'decision-component',
  templateUrl: 'decision-component.html',
})
export class DecisionComponent implements OnInit, OnDestroy {

  public isDisabled: boolean;
  public param1: number = 0;
  public param2: number = 0;

  public inputId: number;
  public model: any;
  public aSubDataModal: Subscription;
  public aSubUpdateStatus: Subscription;
  public aSubSaveResumes: Subscription;

  public subscriptionUser: Subscription;
  public userId: string;

  public decisionForm = new FormGroup({
    decision: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialog,
              private debunkerServise: DebunkerServise,
              public utilService: UtilService,
              private _snackBar: MatSnackBar) {
    this.isDisabled = true;
  }

  ngOnInit() {
    this.aSubDataModal = this.utilService.dataModal.subscribe((arr: Array<number>) => {
      this.inputId = arr[0];
      this.model = arr[1];
    });
    this.subscriptionUser=this.debunkerServise.getUserById().subscribe(userId=>{
      this.userId=userId.id;
    })
  }


  onSubmit(event?: Event) {
    //this.aSubUpdateStatus =
      this.debunkerServise.updateStatus(this.model, this.inputId, this.decisionForm.value.decision).subscribe(
      () => {
        let arr = [this.decisionForm.value.decision, this.decisionForm.value.text]
        this.utilService.setFormDataFromModal(arr);
        if (this.model === "1") {
          this.debunkerServise.saveMaintopicResumes(this.inputId, this.userId, this.decisionForm.value.text).subscribe(
            () => {
              this._snackBar.open('Решение принято', 'Закрыть', {
                duration: this.utilService.CLOSE_TIME
              });
            },
            error => {
              //доработать (+доделать бэк)
              /*this._snackBar.open('Что-то пошло не так. Решение не принято', 'Закрыть', {
              duration: this.utilService.CLOSE_TIME
            })*/
            },
          )
        }
        if (this.model === "2") {
           this.debunkerServise.saveFactResumes(this.inputId, this.userId, this.decisionForm.value.text).subscribe(
            () => {
              this._snackBar.open('Решение принято', 'Закрыть', {
                duration: this.utilService.CLOSE_TIME
              });
            },
             error => {
               //доработать (+доделать бэк)
               /*this._snackBar.open('Что-то пошло не так. Решение не принято', 'Закрыть', {
               duration: this.utilService.CLOSE_TIME
             })*/
             },
          )
        }
      },
      error => this._snackBar.open('Решение не принято', 'Закрыть', {
        duration: this.utilService.CLOSE_TIME
      })
    )
  }


  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.aSubDataModal) {
      this.aSubDataModal.unsubscribe();
    }
    if (this.aSubUpdateStatus) {
      this.aSubUpdateStatus.unsubscribe();
    }
    if (this.aSubSaveResumes) {
      this.aSubSaveResumes.unsubscribe();
    }
    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }

// методы для выставления значения поля isDisabled
  changeParam1(param: any) {
    if (param !== null && !this.utilService.isEmptyOrSpaces(param)) {
      this.param1 = 1;
    } else {
      this.param1 = 0;
    }
    this.cheakActivateOk();
  }
  changeParam2(param: any) {
    if (param !== null && !this.utilService.isEmptyOrSpaces(param)) {
      this.param2 = 1;
    } else {
      this.param2 = 0;
    }
    this.cheakActivateOk();
  }
  cheakActivateOk() {
    this.isDisabled = true;
    if (this.param1 == 1 && this.param2 == 1) {
      this.isDisabled = false;
    }
  }

}
