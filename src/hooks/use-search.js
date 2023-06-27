import {useSelector} from "react-redux";

export function useSearch() {
    const {search, status, page} = useSelector(state => state.user);

    return {
        search, status, page
    };
}