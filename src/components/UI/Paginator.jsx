import React, { useState } from 'react';
import '../styles/Paginator.css'

const Paginator = ({ objects, status, pages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const objectsPerPage = 10;

    const indexOfLastObject = currentPage * objectsPerPage;
    const indexOfFirstObject = indexOfLastObject - objectsPerPage;
    const currentObjects = objects.slice(indexOfFirstObject, indexOfLastObject);

    const handleClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const pageNumbers = []; //refactor!!!!!!!!!!!!!!!!!!! to state & map() -> <button>
    for (let i = 1; i <= pages; i++) {
        pageNumbers.push(
            <button className='pagerButton' key={i} onClick={() => handleClick(i)}>
                {i}
            </button>
        );
    }
    console.log(currentObjects)
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
                {currentObjects.length > 0 ?
                    pageNumbers.map((pageNumber) => (
                        <span key={pageNumber.props.key}>{pageNumber}</span>
                    )) :
                    <p className='statusRole'>
                        {status}
                    </p>}
            </div>
        </div>
    );
};

export default Paginator;
