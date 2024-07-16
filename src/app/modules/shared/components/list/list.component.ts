import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { CDK_DRAG_CONFIG, CdkDragMove, DragDropConfig } from '@angular/cdk/drag-drop';

import { Employee } from '@shared/models/employee';

const DragConfig: DragDropConfig = {
  pointerDirectionChangeThreshold: 5,
  previewClass: 'height-fit',
};

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [{ provide: CDK_DRAG_CONFIG, useValue: DragConfig }],
})
export class ListComponent {
  @ViewChild('listWrapper') listWrapper!: ElementRef;
  @Input({ required: true }) list!: Employee[];
  @Input({ required: true }) heading!: string;
  @Output() listClick = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  onClick(employee: Employee) {
    this.listClick.emit(employee);
  }

  onDelete(event: MouseEvent, employee: Employee) {
    event.stopPropagation();
    this.delete.emit(employee);
  }

  handleSwipe(event: CdkDragMove) {
    const height = event.source.element.nativeElement.clientHeight;
    if (event.delta.x < 0) {
      event.source.element.nativeElement.style.setProperty('--height', -height + 'px');
      event.source.element.nativeElement.classList.add('swiped');
    } else {
      event.source.element.nativeElement.classList.remove('swiped');
    }
  }
}
