import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerListaNegociosComponent } from './ver-lista-negocios.component';

describe('VerListaNegociosComponent', () => {
  let component: VerListaNegociosComponent;
  let fixture: ComponentFixture<VerListaNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerListaNegociosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerListaNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
