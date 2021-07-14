import { fakeAsync, flush, flushMicrotasks, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

describe('Async Testing Examples', () => {
  it('Asyn test example with Jasmine done()', (done: DoneFn) => {
    let test = false;

    setTimeout(() => {
      test = true;

      expect(test).toBeTruthy();

      done();
    }, 1000);
  });

  it('Async test example - setTimeout()', fakeAsync(() => {
    let test = false;

    setTimeout(() => {});
    setTimeout(() => {});
    setTimeout(() => {});

    setTimeout(() => {
      test = true;
    }, 1000);

    // Wait for a specific amount of time
    // tick(1000);

    // Wait for all asyn call
    flush();

    expect(test).toBeTruthy();
  }));

  it('Async test example - plain Promise', fakeAsync(() => {
    let test = false;

    // Promise will always run first because promise is a microtask
    Promise.resolve()
      .then(() => {
        return Promise.resolve();
      })
      .then(() => {
        console.log('Second promise run successfully');
        test = true;
      });

    // flush();

    flushMicrotasks();

    expect(test).toBeTruthy();
  }));

  it('Async example - Promise + setTimeout()', fakeAsync(() => {
    let counter = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter++;
      }, 1000);
    });

    expect(counter).toBe(0);

    flushMicrotasks();

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(10);

    tick(500);

    expect(counter).toBe(11);
  }));

  it('Async test example - Observable', fakeAsync(() => {
    let test = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000);

    expect(test).toBe(true);
  }));
});
