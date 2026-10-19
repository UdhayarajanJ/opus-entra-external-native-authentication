import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Notfound } from './notfound';
import { provideRouter } from '@angular/router';
import { Location } from '@angular/common';
import { describe, it, expect, beforeEach, vi } from 'vitest';
describe('Notfound', () => {
  let component: Notfound;
  let fixture: ComponentFixture<Notfound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Standalone components go into 'imports', not 'declarations'
      imports: [Notfound],
      providers: [
        Location,
        provideRouter([]) // Provides necessary routing context for Location
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Notfound);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call location.back() on goBack()', () => {
    const location = TestBed.inject(Location);
    const spy = vi.spyOn(location, 'back');
    component.goBack();
    expect(spy).toHaveBeenCalled();
  });
});