import {useSelector} from "react-redux";

export function useSearch() {
    const {search, status} = useSelector(state => state.user);

    return {
        search, status
    };
}