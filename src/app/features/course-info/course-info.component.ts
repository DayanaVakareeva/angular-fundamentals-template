import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.scss']
})
export class CourseInfoComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() id: string;
  @Input() duration: number;
  @Input() date: string;
  @Input() authors: string[];

  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();
  @Output() back = new EventEmitter<void>();

  editCourse() {
    this.edit.emit(this.id);
  }

  deleteCourse() {
    this.delete.emit(this.id);
  }

  goBack() {
    this.back.emit();
  }
}