import { RESIZE, CHANGE_LANGUAGE } from '../action-constants';
const MOBILE_SCREEN_SIZE_LIMIT = 500;

const initialState = {
    size: window.innerWidth,
    isMobile: isMobile(window.innerWidth),
    currentLanguage: ""
}

function isMobile(size: number) {
    return size <= MOBILE_SCREEN_SIZE_LIMIT;
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESIZE:
            return { ...state, size: action.size, isMobile: isMobile(action.size) };
        case CHANGE_LANGUAGE:
            return { ...state, currentLanguage: action.currentLanguage };
        default:
            return state;
    }
}

export default rootReducer
