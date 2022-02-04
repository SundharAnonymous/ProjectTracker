import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog/dialog-module';
import { MatDividerModule } from '@angular/material/divider/divider-module';
import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { CreateProject } from './createproject.component';

describe('CreateProject', () => {
  let component: CreateProject;
  let fixture: ComponentFixture<CreateProject>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatDividerModule, MatFormFieldModule,MatSlideToggleModule, ],
      declarations: [ CreateProject ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProject);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
