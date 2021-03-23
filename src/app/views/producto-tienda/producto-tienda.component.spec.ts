import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoTiendaComponent } from './producto-tienda.component';

describe('ProductoTiendaComponent', () => {
  let component: ProductoTiendaComponent;
  let fixture: ComponentFixture<ProductoTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
