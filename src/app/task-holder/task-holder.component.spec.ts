import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskHolderComponent } from './task-holder.component';

describe('TaskHolderComponent', () => {
  let component: TaskHolderComponent;
  let fixture: ComponentFixture<TaskHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
