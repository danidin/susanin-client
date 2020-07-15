import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  emails$: Observable<any>;
  emailForm = new FormGroup({
    address: new FormControl('')
  });
  private updateSub = new BehaviorSubject(null);

  constructor(
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.emails$ = this.updateSub.asObservable()
      .pipe(
        switchMap(() => this.httpClient.get('http://localhost:3000'))
      );
  }

  deleteEmail(id: string) {
    this.httpClient.delete(`http://localhost:3000/${id}`)
      .subscribe(() => this.updateSub.next(null));
  }

  createEmail() {
    this.httpClient.post(`http://localhost:3000`, this.emailForm.value)
      .subscribe(() => this.updateSub.next(null));
  }
}
