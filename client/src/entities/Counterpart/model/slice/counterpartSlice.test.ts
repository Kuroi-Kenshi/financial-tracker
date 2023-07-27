import { counterpartReducer } from './counterpartSlice';
import { type Counterpart, type CounterpartSchema } from '../types/counterpartSchema';
import { getCounterpart } from '../services/getCounterpart/getCounterpart';
import { updateCounterpart } from '../services/updateCounterpart/updateCounterpart';
import { deleteCounterpart } from '../services/deleteCounterpart/deleteCounterpart';
import { createCounterpart } from '../services/createCounterpart/createCounterpart';

describe('counterpartSlice', () => {
  const initialState: CounterpartSchema = {
    data: [],
    isLoading: false,
    error: undefined,
  };

  test('getCounterpart.fulfilled', () => {
    const counterpart1: Counterpart = { id: 1, name: 'Test 1', description: 'Test counterpart 1' };
    const counterpart2: Counterpart = { id: 2, name: 'Test 2', description: 'Test counterpart 2' };
    const action = getCounterpart.fulfilled([counterpart1, counterpart2], '');

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([counterpart1, counterpart2]);
    expect(newState.error).toBeUndefined();
  });

  test('updateCounterpart.fulfilled', () => {
    const counterpart1: Counterpart = { id: 1, name: 'Test 1', description: 'Test counterpart 1' };
    const counterpart2: Counterpart = { id: 2, name: 'Test 2', description: 'Test counterpart 2' };
    const initialState: CounterpartSchema = {
      data: [counterpart1, counterpart2],
      isLoading: false,
      error: undefined,
    };
    const updatedCounterpart: Counterpart = {
      ...counterpart1,
      description: 'Updated counterpart 1',
    };
    const action = updateCounterpart.fulfilled(updatedCounterpart, '', counterpart1);

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([updatedCounterpart, counterpart2]);
    expect(newState.error).toBeUndefined();
  });

  test('deleteCounterpart.fulfilled', () => {
    const counterpart1: Counterpart = { id: 1, name: 'Test 1', description: 'Test counterpart 1' };
    const counterpart2: Counterpart = { id: 2, name: 'Test 2', description: 'Test counterpart 2' };
    const initialState: CounterpartSchema = {
      data: [counterpart1, counterpart2],
      isLoading: false,
      error: undefined,
    };
    const action = deleteCounterpart.fulfilled(counterpart1, '', 1);

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([counterpart2]);
    expect(newState.error).toBeUndefined();
  });

  test('createCounterpart.fulfilled', () => {
    const counterpart1: Counterpart = { id: 1, name: 'Test 1', description: 'Test counterpart 1' };
    const initialState: CounterpartSchema = {
      data: [counterpart1],
      isLoading: false,
      error: undefined,
    };
    const newCounterpart: Counterpart = {
      id: 1,
      name: 'Test 2',
      description: 'Test counterpart 2',
    };
    const action = createCounterpart.fulfilled(newCounterpart, '', counterpart1);

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.data).toEqual([newCounterpart, counterpart1]);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for pending action', () => {
    const action = { type: 'counterpart/get/pending' };

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(true);
    expect(newState.error).toBeUndefined();
  });

  test('matcher for rejected action', () => {
    const action = { type: 'counterpart/get/rejected', payload: 'Test error' };

    const newState = counterpartReducer(initialState, action);

    expect(newState.isLoading).toBe(false);
    expect(newState.error).toEqual('Test error');
  });
});
