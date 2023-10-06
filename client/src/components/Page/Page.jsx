
import style from './Page.module.css';

const Page = ({dogsPerPage, allDogs, page}) => {
  const pageNumbers = []
  //Math.ceil: redondea para arriba
  for(let i=0; i<=Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i+1)
  }
  return (
    <nav>
      <ul className={style.page}>
        {pageNumbers &&
          pageNumbers.map(number => (
            <li className={style.listNumber} key={number}>
              <a onClick={() => page(number)}>{number}</a>
            </li>    
          ))};
      </ul>
    </nav>
  )
}


export default Page;