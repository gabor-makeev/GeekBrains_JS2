const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50  },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

// Убрал скобки для более краткой записи функции renderGoodsItem
const renderGoodsItem = (title, price, imageSrc = 'images/empty-image.svg', imageClass = 'goods-item-empty', currency = '$') => `<div class="goods-item"><img src="${imageSrc}" class="${imageClass}" alt="product image"><h3>${title}</h3><p>${currency}${price}</p></div>`;

// Убрал объявление переменной goodsList в renderGoodsList. Если я правильно понял, ее присутствие не обязательно
const renderGoodsList = (list  = [{ title: 'catalog is empty', price: '', imageSrc: 'images/empty-catalog.svg', imageClass: '', currency: '' }]) => {
  document.querySelector('.goods-list')
      .innerHTML = list
      .map(item => renderGoodsItem(item.title, item.price, item.imageSrc, item.imageClass, item.currency))
      .join('');
  // Я так понял метод map() возвращает массив с запятой между элементами, метод join() решил вопрос
}

renderGoodsList(goods);