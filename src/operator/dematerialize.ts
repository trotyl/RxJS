import {Operator} from '../Operator';
import {Observable} from '../Observable';
import {Subscriber} from '../Subscriber';
import {Notification} from '../Notification';

/**
 * Returns an Observable that transforms Notification objects into the items or notifications they represent.
 * @returns {Observable} an Observable that emits items and notifications embedded in Notification objects emitted by the source Observable.
 */
export function dematerialize<T>(): Observable<any> {
  return this.lift(new DeMaterializeOperator());
}

class DeMaterializeOperator<T extends Notification<any>, R> implements Operator<T, R> {
  call(subscriber: Subscriber<any>) {
    return new DeMaterializeSubscriber(subscriber);
  }
}

class DeMaterializeSubscriber<T extends Notification<any>> extends Subscriber<T> {
  constructor(destination: Subscriber<any>) {
    super(destination);
  }

  _next(value: T) {
    value.observe(this.destination);
  }
}
