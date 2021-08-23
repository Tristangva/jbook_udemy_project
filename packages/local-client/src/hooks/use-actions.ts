/*
    use actions from dispatch
 */

import { useMemo } from "react";
import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {ActionCreators} from '../state';

/*
 * Call use actions, dispatch function binds action creators together
 */
export const useActions = () => {
    const dispatch = useDispatch();

    return useMemo(() =>{
        return bindActionCreators(ActionCreators, dispatch);
    }, [dispatch]);
}

