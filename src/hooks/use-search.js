import {useSelector} from "react-redux";

export function useSearch() {
    const {search} = useSelector(state => state.user);

    return {
        search
    };
}