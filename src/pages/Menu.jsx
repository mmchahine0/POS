import Categories from '../components/categories';
import { categories } from '../dummyDb/categoriesDB';

const Menu = () =>{
  return <div>
  <div className="categories-container">
      {categories.map((category) => (
        <div className="category-item" key={category.id}>
          <Categories img={category.img} name={category.name} stock={category.stock} />
        </div>
      ))}
    </div>
  </div>
}
export default Menu;