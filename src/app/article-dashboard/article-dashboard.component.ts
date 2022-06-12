import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {Fact} from "../shared/classes/Fact";
import {UtilService} from "../shared/services/util.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {DebunkerServise} from "../shared/services/debunker.service";
import {HttpClient} from "@angular/common/http";
import {Img} from "../shared/interfaces";


@Component({
  selector: 'app-article-dashboard',
  templateUrl: './article-dashboard.component.html',
  styleUrls: ['./article-dashboard.component.css']
})
export class ArticleDashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  public isAnalise = false;

  @Input()
  public mainTopic: any;

  public maintopicId: any;

  public facts: any;
  public fact: Fact;
  public factId: any;

  public isFactRoot = false;

  public titleColumns: string[] = ['name', 'source_score', 'publication_date'];
  public titleColumnImgs: string[] = ['base64', 'publication_date'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  public src: any;
  public images: any;
  public imgs: any;
  public gradeQuality:number;
  public gradeOrtho:number;
  public gradeTonality:number;
  public gradeToxicity:number;

  public imagesSlider: string[] = [];

  private subscription: Subscription;
  private subscriptionRT: Subscription;
  private subscriptionRTWF: Subscription;
  private subscriptionL: Subscription;
  private subscriptionState: Subscription;


  constructor(public utilService: UtilService,
              private debunkerServise: DebunkerServise,
              private router: Router,
              private http: HttpClient,
              private activateRoute: ActivatedRoute) {
    this.facts = new MatTableDataSource<Fact>();
    this.imgs = new MatTableDataSource<Img>();
    this.gradeQuality=0;
    this.gradeOrtho=0;
    this.gradeTonality=0;
    this.gradeToxicity=0;

    this.imagesSlider = [];
    // Роутинг
    this.subscription = activateRoute.params.subscribe((params) => {
      if (!router.navigated) {
        let rout = this.router.url;
        let firstIndSlesh = rout.indexOf('/', 2);
        let secodIndSlesh = rout.indexOf('/', 14);
        let endInd = rout.length;
        var firstId;
        var secondId;
        if (firstIndSlesh !== -1 && secodIndSlesh === -1) {
          firstId = rout.substring(firstIndSlesh + 1, endInd);
          // обновление Главной Новости
          this.refreshTopic(firstId);
        }
        if (firstIndSlesh !== -1 && secodIndSlesh !== -1) {
          // обновление факта
          firstId = rout.substring(firstIndSlesh + 1, secodIndSlesh);
          secondId = rout.substring(secodIndSlesh + 1, endInd);
          this.refreshTopicWithFacts(firstId, secondId);
        }
        if (firstIndSlesh === -1 && secodIndSlesh === -1) {
          // главная
        }
      } else {
        //обычная загрузка
        this.loadData(this.utilService.getData());
      }
    });
  }

  ngOnInit(): void {
    this.subscriptionState=this.utilService.formData.subscribe( arr=>{
      this.mainTopic.status=this.utilService.convertStatus(arr[0]);
    })
  }

  // обновление Главной Новости
  refreshTopic(id: string) {
    this.subscriptionRT = this.debunkerServise.getTopicById(id).subscribe(mt => {
      if (mt) {
        //console.log(' Получение mt');
        //console.log(mt);
        this.mainTopic = mt;
        this.maintopicId = this.mainTopic.id
        this.isAnalise = true;
        this.debunkerServise.getFactsByMainTopicId(this.maintopicId).subscribe(main => {
          this.facts = main.facts_items;
          const cloneMain = Object.assign({}, main.images_items);
          let dataSrc = [];
          Object.values(cloneMain).forEach(
            (value: Img) => {
              dataSrc.push(value.base64);
            });
          this.imagesSlider = dataSrc;

          // вот они ! Самые важные оценки!
          this.gradeQuality=this.mainTopic.source_score;
          this.gradeOrtho=this.mainTopic.orthography;
          this.gradeTonality=this.mainTopic.tonality;
          this.gradeToxicity=this.mainTopic.toxicity;
        });
        //todo
        /*this.debunkerServise.getImgs().subscribe(main => {
          //this.imgs = [];
        });*/


      }
      //навигационная цепочка
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.isFactRoot = this.router.url === '/newsanalysis/' + this.maintopicId + '/' + this.factId
        }
      })
    });
  }

  // обновление Главной Новости с Фактами
  refreshTopicWithFacts(id: string, factId: string) {
    this.subscriptionRTWF=this.debunkerServise.getTopicById(id).subscribe(mt => {
      this.loadData(mt);
      this.debunkerServise.getCommentsByFactId(factId).subscribe(f => {
        if (f) {
          this.fact = f;
          this.factId = this.fact.id
        }
        this.isFactRoot = true;
        this.utilService.setFact(this.fact);
      });
    });
  }

  // Подгрузка данных
  loadData(mainTopic) {
    if (mainTopic) {
      this.mainTopic = mainTopic;
      this.maintopicId = mainTopic.id
      this.isAnalise = true;
      this.subscriptionL = this.debunkerServise.getFactsByMainTopicId(this.maintopicId).subscribe(main => {
        this.facts = main.facts_items;
        const cloneMain = Object.assign({}, main.images_items);
        let dataSrc = [];
        Object.values(cloneMain).forEach(
          (value: Img) => {
            dataSrc.push(value.base64);
          });
        this.imagesSlider = dataSrc;

        // вот они ! Самые важные оценки!
        this.gradeQuality=this.mainTopic.source_score;
        this.gradeOrtho=this.mainTopic.orthography;
        this.gradeTonality=this.mainTopic.tonality;
        this.gradeToxicity=this.mainTopic.toxicity;
        //todo
        /*this.debunkerServise.getImgs().subscribe(main => {
          //this.imgs = [];
        });*/

      });
    }
    //навигационная цепочка
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isFactRoot = this.router.url === '/newsanalysis/' + this.maintopicId + '/' + this.factId
      }
    })
  }

  ngAfterViewInit() {
    this.facts.paginator = this.paginator;
  }

  //Открытие факта по клику записи на гриде
  openByClick(row: Fact) {
    if (row) {
      this.fact = row;
      this.factId = this.fact.id
    }
    this.isFactRoot = true;
    this.utilService.setFact(this.fact);
    let url: string = '/newsanalysis/' + this.maintopicId + '/' + this.factId;
    //навигация. переход урла.
    this.router.navigateByUrl(url);
    this.isFactRoot = this.router.url === '/newsanalysis/' + this.maintopicId
  }

  //Отписываемся от подписок, чтобы не было утечек памяти
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionRT) {
      this.subscriptionRT.unsubscribe()
    }
    if (this.subscriptionRTWF) {
      this.subscriptionRTWF.unsubscribe()
    }
    if (this.subscriptionL) {
      this.subscriptionL.unsubscribe()
    }
    if (this.subscriptionState) {
      this.subscriptionState.unsubscribe()
    }
  }
  convertData(date) {
    return new Date(date).toLocaleDateString()
  }

}

