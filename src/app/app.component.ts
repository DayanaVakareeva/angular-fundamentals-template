import { Component } from '@angular/core';
import { Subject, Observable, forkJoin, combineLatest } from 'rxjs';
import { debounceTime, filter, switchMap, tap } from 'rxjs/operators';
import { MockDataService } from '/shared/mocks/mock.ts';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'courses-app';

  courses = [
    {
      title: 'Angular Fundamentals',
      description: 'Learn the fundamentals of Angular.',
      creationDate: new Date(),
      duration: 120,
      authors: ['John Doe', 'Jane Smith']
    },
    // Add more courses as needed
  ];

  editable = true;

  handleShowCourse(course: any) {
    console.log('Show course:', course);
  }

  handleEditCourse(course: any) {
    console.log('Edit course:', course);
  }

  handleDeleteCourse(course: any) {
    console.log('Delete course:', course);
  }
}