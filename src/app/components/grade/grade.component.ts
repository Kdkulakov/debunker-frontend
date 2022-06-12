import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DecisionComponent} from "./decision-component";
import {Subscription} from "rxjs";
import {UtilService} from "../../shared/services/util.service";
import {DebunkerServise} from "../../shared/services/debunker.service";

// Кастомная шаблон-компонента блока с Оценками Нейросети и Решением
@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit,OnDestroy {

  public decisionField: string;

  // Оценки
  @Input()
  gradeQuality: number;
  @Input()
  gradeOrtho: number;
  @Input()
  gradeTonality: number;
  @Input()
  gradeToxicity: number;

  //вводим вид модели,для определения адреса урла
  //1- главная новость,2- смежная новость, 3- смежная картинка
  @Input()
  public model: string;
  //вводим айди
  @Input()
  public inputId: number;

  //Подписка на событие отслеживания события изменение текста в модальной форме "Решения"
  public aSub: Subscription;
  //Подписка на получение данных из БД
  public aSubDecisions: Subscription;


  constructor(public dialog: MatDialog,
              private debunkerServise: DebunkerServise,
              public utilService: UtilService) {
    this.decisionField='';
  }

  ngOnInit(): void {

    if (this.model === "1") {
      //this.aSubDecisions=
        this.debunkerServise.getMTDecisions(this.inputId).subscribe(
        (resume) => {
          this.decisionField=resume.text;
        })
    }
    if (this.model === "2") {
      //this.aSubDecisions=
      this.debunkerServise.getFDecisions(this.inputId).subscribe(
        (resume) => {
          this.decisionField=resume.text;
        })
    }
    if (this.model === "3") {
      //this.aSubDecisions=
      this.debunkerServise.getPDecisions(this.inputId).subscribe(
        (resume) => {
          this.decisionField=resume.text;
        })
    }

    this.aSub=this.utilService.formData.subscribe( arr=>{
      this.decisionField=arr[1];
    })

  }

  openModal() {
    let arr = [this.inputId, this.model]
    console.log('=========== Проверка arr');
    console.log(arr);
    // Открытие модального окна DecisionComponent
    const dialogRef = this.dialog.open(DecisionComponent,{height:  'fit-content'});
    dialogRef.afterOpened().subscribe(afterOpened => {
      this.utilService.setModalDataFromForm(arr);
    });

  }

  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
    if (this.aSubDecisions) {
      this.aSubDecisions.unsubscribe();
    }
  }

}
