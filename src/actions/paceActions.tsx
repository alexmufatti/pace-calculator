import {UPDATE} from '../action-constants';


export const update = (field, value) => ({
    type: UPDATE,
    field,
    value
});
