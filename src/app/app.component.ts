import { Component } from '@angular/core';
import { Subject, Observable, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { MockDataService } from './services/mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';
  searchTermByCharacters = new Subject<string>();
  characters$: Observable<string[]>;
  planetAndCharactersResults$!: Observable<string[]>; 
  isLoading = false;

  constructor(private mockDataService: MockDataService) {

    this.characters$ = this.searchTermByCharacters.pipe(
      filter(term => term.length >= 3), 
      debounceTime(300), 
      switchMap(term => this.mockDataService.getCharacters(term)) 
    );

  
    combineLatest([
      this.mockDataService.getCharactersLoader(),
      this.mockDataService.getPlanetLoader()
    ]).pipe(
      tap(([charLoader, planetLoader]) => {
        this.isLoading = charLoader || planetLoader;
      })
    ).subscribe();
  }

  changeCharactersInput(term: string) {
    this.searchTermByCharacters.next(term);
  }

  loadCharactersAndPlanets() {
    this.planetAndCharactersResults$ = forkJoin([
      this.mockDataService.getCharacters(''),
      this.mockDataService.getPlanets()
    ]).pipe(
      tap(([characters, planets]) => {
        console.log('Characters:', characters);
        console.log('Planets:', planets);
      })
    );
  }
}