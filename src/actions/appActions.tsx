import { RESIZE } from '../action-constants';

export const resize = (size:Number) => ({
    type: RESIZE,
    size
});

