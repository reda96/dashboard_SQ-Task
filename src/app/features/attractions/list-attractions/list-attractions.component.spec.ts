import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAttractionsComponent } from './list-attractions.component';

describe('ListAttractionsComponent', () => {
  let component: ListAttractionsComponent;
  let fixture: ComponentFixture<ListAttractionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAttractionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAttractionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
