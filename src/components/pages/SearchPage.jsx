import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Paginator from "../UI/Paginator";
import '../styles/SearchPage.css'
import {useDispatch} from "react-redux";
import {useSearch} from "../../hooks/use-search";
import {setSearch} from "../../store/slices/userSlices";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('get python machine learning');
  const [repositories, setRepositories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [curStatus, setCurStatus] = useState('Давайте начнём поиск!');

  const dispatch = useDispatch();
  const SearchQ = useSearch();
  console.log(SearchQ)

    const fetchRepositories = async (perPage = 100) => {
        setRepositories([]);
        setCurStatus('Ищем...');
        try {
            const response = await axios.get('https://api.github.com/search/repositories', {
                params: {
                    q: searchQuery.length <= 0 ? '%' : searchQuery,
                    sort: 'stars',
                    order: 'desc',
                    per_page: perPage,
                },
            });

            const { items, total_count } = response.data;
            console.log(items)
            const totalPages = Math.ceil(total_count / perPage);
            setRepositories(items);
            setTotalPages(totalPages);
            if(items.length === 0){
                setCurStatus('Ничего не найдено!');
            }
            return { items, totalPages };
        } catch (error) {
            setCurStatus('Произошла ошибка =(');
            console.error(error);
            throw new Error('Failed to search repositories');
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
                      fetchRepositories();
                  }}}
              />
              <button className='searchbutton' onClick={()=>{fetchRepositories()}}>Поиск Github</button>
          </div>
          <div className='sortLine'>

          </div>
      </div>
      <Paginator objects={repositories} pages={totalPages} status={curStatus}/>
    </div>
  );
};

export default SearchPage;
