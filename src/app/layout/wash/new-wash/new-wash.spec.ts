import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWash } from './new-wash';

describe('NewWash', () => {
  let component: NewWash;
  let fixture: ComponentFixture<NewWash>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewWash]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewWash);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
