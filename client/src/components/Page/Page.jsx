
import style from './Page.module.css';

const Page = ({dogsPerPage, allDogs, page}) => {
  const pageNumbers = []
  //Math.ceil: redondea para arriba
  for(let i=1; i<=Math.ceil(allDogs/dogsPerPage); i++){
    pageNumbers.push(i)
  }
  return (
    <nav>
      <ul className={style.page}>
        {pageNumbers &&
          pageNumbers.map(number => (
            <li className={style.listNumber} key={number}>
              <a className={style.anchor} onClick={() => page(number)}>{number}</a>
            </li>    
          ))}
      </ul>
    </nav>
  )
}


export default Page;