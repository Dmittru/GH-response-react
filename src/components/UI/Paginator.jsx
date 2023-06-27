import React, {useEffect, useState} from 'react';
import '../styles/Paginator.css'
import {fetchGithubRepositories} from "../API/fetchGithubRepositories";
import {useSearch} from "../../hooks/use-search";
import {setStatus} from "../../store/slices/userSlices";
import {useDispatch} from "react-redux";

const Paginator = ({ objects, pages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [repositories, setRepositories] = useState([])
    const {search, status} = useSearch();

    const currentObjects = repositories.slice(0, 10);
    console.log(currentObjects)
    
    const dispatch = useDispatch();

    const ChangePage = async (pageNumber,perPage = 10, searchstroke = search) => {
        setCurrentPage(pageNumber);
        setRepositories([])
        dispatch(setStatus({status:'Загружаем следущую страницу...'}));
        try{
            const {items, totalPages} = await fetchGithubRepositories(perPage, searchstroke, pageNumber)
            console.log('LOGGED PAGES:',items, totalPages)
            setRepositories(items);
            // setTotalPages(totalPages);
            if (items.length === 0) {
                dispatch(setStatus({status:'Ничего не найдено или страница неисправна!'}));
            }
        } catch (error) {
            dispatch(setStatus({status:'Произошла ошибка в странице =('}));
        }
    };

    const RenderButtons = (pages, current) => {
        if (pages < 11) {
            return Array.from({length: pages > 11 ? 10 : pages}, (_, index) =>
                <button
                    className={index + 1 === currentPage ? 'pagerButton picked' : 'pagerButton'}
                    key={index}
                    onClick={() => ChangePage(index + 1)}
                >
                    {index + 1}
                </button>
            )
        } else {
            if (current < 5) {
                return Array.from({length: 10}, (_, index) => {
                    const refactoredIndex = index + pages-9;
                    if(index<5){
                        return (
                            <button
                                className={index + 1 === current ? 'pagerButton picked' : 'pagerButton'}
                                key={index}
                                onClick={() => ChangePage(index + 1)}
                            >
                                {index + 1}
                            </button>
                        )
                    } else if (index > 5 && refactoredIndex < pages-2) {
                        return (
                            <button
                                className='pagerButton'
                                key={index}
                            >
                                {'...'}
                            </button>
                        )
                    } else if(index > 5 && refactoredIndex >= pages-3){
                        return (
                            <button
                                className={index + 1 === current ? 'pagerButton picked' : 'pagerButton'}
                                key={index}
                                onClick={() => ChangePage(index + 1)}
                            >
                                {refactoredIndex}
                            </button>
                        )
                    }
                });
            } else if (current >= 5 && current < pages-5) {

            } else if (current >= pages-5) {

            }
        }
    }

    useEffect(() => {
        setRepositories(objects.slice(0, 9));
    }, [objects]);

    return (
        <div className='flexed'>
            {currentObjects.map((object) => (
                <div className='reposBlock' key={object.id}>
                    <div className='repTop'>

                        <p className='repText repName'>{object.name}</p>
                        <p className='repText'>{object.stargazers_count}⭐</p>
                    </div>
                    <p className='repText'>Последний коммит: {new Date(object.pushed_at).toLocaleDateString("en-GB")+' '+new Date(object.pushed_at).toLocaleTimeString("en-GB")}</p>
                    <a className='repText' href={object.html_url}>🔗Ссылка на репозиторий</a>
                </div>
            ))}

            <div>
                {/*может здесь понадобится длинну проверять по objects*/}
                {currentObjects.length > 0 ?
                    RenderButtons(pages, currentPage).map((pageNumber,key) => (
                        <span key={key}>{pageNumber}</span>
                    )) :
                    <p className='statusRole'>
                        {status}
                    </p>}
            </div>
        </div>
    );
};

export default Paginator;