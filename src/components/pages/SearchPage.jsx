import React, {useEffect, useState} from 'react';
import Paginator from "../UI/Paginator";
import '../styles/SearchPage.css'
import {useDispatch} from "react-redux";
import {useSearch} from "../../hooks/use-search";
import {setSearch, setStatus} from "../../store/slices/userSlices";
import {fetchGithubRepositories} from "../API/fetchGithubRepositories";

const SearchPage = () => {
  const [repositories, setRepositories] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(()=>{
      dispatch(setStatus({status:'Давайте начнём поиск!'}))
  },[])
  const dispatch = useDispatch();
  const SearchQ = useSearch();
    const fetchRepositories = async (perPage, search = SearchQ.search, page = 1) => {
        setRepositories([]);
        dispatch(setStatus({status:'Ищем...'}));
        try{
            const {items, totalPages} = await fetchGithubRepositories(perPage, search, page)
            console.log('LOGGED:',items, totalPages)
            setRepositories(items);
            setTotalPages(totalPages);
            if (items.length === 0) {
                dispatch(setStatus({status:'Ничего не найдено!'}));
            }
        } catch (error) {
            dispatch(setStatus({status:'Произошла ошибка =('}));
        }

    };


    return (
    <div className='Container flexed'>
      <div className='banner'>
          <h1 className='mainlabel'>Github Dashboard</h1>
          <div className='searchLine'>
              <input
                  type="text"
                  value={SearchQ.search}
                  onChange={(e)=>{
                      dispatch(setSearch({search:String(e.target.value)}))
                      console.log(e.target.value)
                  }}
                  placeholder="Поиск по репозиториям..."
                  className='searchbox'
                  onKeyDown={(e)=>{ if (e.key === 'Enter') {
                      fetchRepositories(10);
                  }}}
              />
              <button className='searchbutton' onClick={()=>{fetchRepositories(10)}}>Поиск Github</button>
          </div>
          <div className='sortLine'>

          </div>
      </div>
      <Paginator objects={repositories} pages={totalPages}/>
    </div>
  );
};

export default SearchPage;
