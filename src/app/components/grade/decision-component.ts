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


  public inputId: number;
  public model: any;
  public aSubDataModal: Subscription;
  public aSubUpdateStatus: Subscription;
  public aSubSaveResumes: Subscription;

  public decisionForm = new FormGroup({
    decision: new FormControl('', [Validators.required]),
    text: new FormControl('', [Validators.required])
  });

  constructor(public dialog: MatDialog,
              private debunkerServise: DebunkerServise,
              public utilService: UtilService,
              private _snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.aSubDataModal = this.utilService.dataModal.subscribe((arr: Array<number>) => {
      this.inputId = arr[0];
      this.model = arr[1];
    });
  }


  onSubmit(event?: Event) {
    //this.aSubUpdateStatus =
      this.debunkerServise.updateStatus(this.model, this.inputId, this.decisionForm.value.decision).subscribe(
      () => {
        let arr = [this.decisionForm.value.decision, this.decisionForm.value.text]
        this.utilService.setFormDataFromModal(arr);
        if (this.model === "1") {
          this.debunkerServise.saveMaintopicResumes(this.inputId, this.utilService.users[0].id, this.decisionForm.value.text).subscribe(
            () => {
              this._snackBar.open('Решение принято', 'Закрыть', {
                duration: this.utilService.CLOSE_TIME
              });
            },
            error => {
              //доработать
              /*this._snackBar.open('Что-то пошло не так. Решение не принято', 'Закрыть', {
              duration: this.utilService.CLOSE_TIME
            })*/
            },
          )
        }
        if (this.model === "2") {
           this.debunkerServise.saveFactResumes(this.inputId, this.utilService.users[0].id, this.decisionForm.value.text).subscribe(
            () => {
              this._snackBar.open('Решение принято', 'Закрыть', {
                duration: this.utilService.CLOSE_TIME
              });
            },
             error => {
               //доработать
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
  }


}
