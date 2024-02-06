import React from 'react'
import {getPagesArray} from '../../../utils/pages'

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)
  return (
      <div className='page__wrapper'>
        {pagesArray.map(p => 
          <span key={p} className={page === p ? 'page page__current' : 'page'} 
          onClick={() => changePage(p)}>
          {p}
          </span> // условие: если элемент итерации функции map = номеру текущей страницы, то добавляем к нему класс page__current если не равны, то page
        )}
      </div>
  )
}

export default Pagination
