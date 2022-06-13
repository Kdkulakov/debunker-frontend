import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "./modal-component";

// Второй общий слой на котором с помощью router-outlet происходит управление роутингом на analysis-page,article-dashboard,source-page
@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('floating') floatingRef: ElementRef;

  links = [
    {url: '/newsanalysis', name: 'Аналитика', icon: 'find_in_page'},
    {url: '/news', name: 'Все новости', icon: 'file_copy'},
    {url: '/sources', name: 'Все источники', icon: 'library_books'},
  ]

  constructor(private auth: AuthService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  openModal() {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
  }


  toggleClass(event: any) {
    const classList = event.target.classList;
    const classes = event.target.className;
    classes.includes('active') ? classList.remove('active') : classList.add('active');
  }

  //метод прослушка  с защитой по клику назад,если в мень нажали "выйти"
  logout(event: any) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login'])
  }


}
