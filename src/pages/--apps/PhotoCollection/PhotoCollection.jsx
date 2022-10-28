import React from 'react';
import '../_sass/PhotoCollection.scss';
import { Collection } from './Collection';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
  ]

export const PhotoCollection = () => {
    const [collections, setCollections] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [isLoading, setLoading] = React.useState(true)
    const [searchValue, setSearchValue] = React.useState('')
    const [categoriesId, setCategoriesId] = React.useState(0)
    // 
    React.useEffect(() => {
        setLoading(true)
        fetch(`https://6352a403a9f3f34c37454175.mockapi.io/photo_collection?page=${page}&limit=3${categoriesId ? '&category='+categoriesId : ''}`)
            .then(resp => resp.json())
            .then(json => {
                setCollections(json)
            })
            .catch(err => {
                alert('Ошибка при получении данных!')
                console.warn(err)
            })
            .finally(() => {
                // console.log('finally...')
                setLoading(false)
            })
    }, [categoriesId, page])
    // 
    const onChangeSearch = (value) => {
        setSearchValue(value)
    }
    return (
        <div className="photocollection">
            <h1>Моя коллекция фотографий</h1>
            <div className="top">
                <ul className="tags">
                    {
                        cats.map((obj,i) => (
                            <li 
                                key={obj.name}
                                className={categoriesId===i ? 'active' : ''}
                                onClick={()=>setCategoriesId(i)}
                            >{obj.name}</li>
                        ))
                    }
                </ul>
                <input 
                    value={searchValue}
                    onChange={(e)=>onChangeSearch(e.target.value)}
                    className="search-input" placeholder="Поиск по названию" />
            </div>
            <div className="content">
                {isLoading ? (
                    <h2>Идет загрузка...</h2>
                    ) : (
                            collections.filter(obj => {
                                return obj.name.toLowerCase().includes(searchValue.toLowerCase()) 
                            }).map((obj, index) => (
                                <Collection
                                key={index}
                                name={obj.name}
                                images={obj.photos}
                                />                        
                            ))
                        )
                }
            </div>
            <ul className="pagination">
                {[...Array(5)].map((_,i) => (
                    <li
                        key={i}    
                        className={page===i+1 ? 'active' : ''}
                        onClick={()=>setPage(i+1)}
                    >{i+1}</li>
                ))}
            </ul>
        </div>
    );
}


