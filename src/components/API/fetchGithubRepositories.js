import axios from "axios";
export const fetchGithubRepositories = async (perPage, search, page) => {
    try {
        const response = await axios.get('https://api.github.com/search/repositories', {
            params: {
                q: search.length > 0 ? search : 'stars:>0',
                page: page,
                sort: 'stars',
                order: 'desc',
                per_page: perPage,
            },
        });

        const {items, total_count} = response.data;
        const totalPages = search.length > 0 ? Math.ceil(total_count / perPage) : 0;
        return {items, totalPages};
    } catch (error) {
        console.error(error);
        throw new Error('Failed to search repositories');
    }
}