import {Observable} from '../Observable';
import {FindValueOperator} from './find-support';

/**
 * Returns an Observable that searches for the first item in the source Observable that
 * matches the specified condition, and returns the the index of the item in the source.
 * @param {function} predicate function called with each item to test for condition matching.
 * @returns {Observable} an Observable of the index of the first item that matches the condition.
 */
export function findIndex<T>(predicate: (value: T, index: number, source: Observable<T>) => boolean, thisArg?: any): Observable<number> {
  return this.lift(new FindValueOperator(predicate, this, true, thisArg));
}
