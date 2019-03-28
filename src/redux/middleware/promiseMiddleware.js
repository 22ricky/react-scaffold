import axios from 'axios';

export default store => next => action => {
  const {dispatch, getState} = store;
  // 如果 dispatch 来的是一个函数，直接跳出
  if (typeof action === 'function') {
    action(dispatch, getState);
    return;
  }

  const {promise, type, afterSuccess, ...rest} = action;

  // 
  if (!promise) {
    next(action);
  }

  const [REQUEST, SUCCESS, FAILURE] = type;

  next({
    ...rest,
    type: REQUEST
  });

  const onFulfilled = result => {
    next({
      ...rest,
      result,
      type: SUCCESS
    });
    if (afterSuccess) {
      afterSuccess(dispatch, getState, result);
    }
  }

  const onRejected = error => {
    next({
      ...rest,
      error,
      type: FAILURE
    });
  }

  return promise(axios).then(onFulfilled, onRejected).catch(error => {
    console.error('MIDDLEWARE ERROR:', error);
    onRejected(error);
  });
}