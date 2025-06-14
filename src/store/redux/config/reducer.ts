import { combineReducers } from 'redux';
import { reducer as storiesReducer } from '@store/redux/stories-redux';

const reducers = combineReducers({
    stories: storiesReducer,
});

export default reducers;
