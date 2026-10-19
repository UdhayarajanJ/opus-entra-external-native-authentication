import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { Auth } from './core/services/auth';
import { vi } from 'vitest';

describe('App', () => {
  const authenticated = signal(false);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: Auth,
          useValue: {
            authenticated,
            // Provide mock implementation so child layout/header components don't crash
            getCurrentAccountDetails: vi.fn().mockReturnValue({
              name: 'Test User',
              username: 'test@example.com'
            }),
            getClient: vi.fn()
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display the login component when unauthenticated', () => {
    authenticated.set(false);
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    expect(element.querySelector('app-login')).not.toBeNull();
    expect(element.querySelector('app-layout')).toBeNull();
  });

  it('should display the layout when authenticated', () => {
    // 1. Create the component fixture first
    const fixture = TestBed.createComponent(App);
    
    // 2. Inject the Auth service and set authenticated to true
    const authService = TestBed.inject(Auth) as any;
    authService.authenticated.set(true);

    // 3. Trigger change detection so the template updates
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-layout')).not.toBeNull();
    expect(element.querySelector('app-login')).toBeNull();
  });

  it('should display the app wrapper when unauthenticated', () => {
    authenticated.set(false);

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.app-wrapper')).not.toBeNull();
  });

  it('should respond when authentication state changes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    let element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-login')).not.toBeNull();

    authenticated.set(true);
    fixture.detectChanges();

    element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('app-layout')).not.toBeNull();
    expect(element.querySelector('app-login')).toBeNull();
  });
});