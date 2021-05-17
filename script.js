class GoodsItem {
  constructor(title = 'unknown', price = 0, currency = '$', imageSrc = 'images/empty-image.svg', imageClass = 'goods-item-empty') {
    this.title = title;
    this.price = price;
    this.currency = currency;
    this.imageSrc = imageSrc;
    this.imageClass = imageClass;
  }

  render() {
    return `<div class="goods-item">
                <img src="${this.imageSrc}" class="${this.imageClass}" alt="product image">
                <h3>${this.title}</h3>
                <p>${this.currency}${this.price}</p>
                <button>Купить</button>
            </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
  }

  fetchGoods() {
    this.goods = [
      { title: 'Shirt', price: 150 },
      { title: 'Socks', price: 50  },
      { title: 'Jacket', price: 350 },
      { title: 'Shoes', price: 250 },
    ];
  }

  // Решение 2-го задания // параметр quantity добавил на случай если в будущем появится информация о количестве товаров в наличии
  calculateTotalPrice(quantity = 1) {
    return this.goods.reduce((sum, good) => {
      return sum + (good.price * quantity);
    }, 0);
  }

  render() {
    let html = '';
    this.goods.forEach(good => {
      let goodItem = new GoodsItem(good.title, good.price);
      html += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = html;
    // на время этого PR-а вставил вывод решения 2-го задания в заголовок
    document.querySelector('.header-logo').textContent += `Тут вы можете купить товаров на $${this.calculateTotalPrice()}`;
  }
}

// Решение 1-го задания
class CartItem extends GoodsItem {
  // функция добавляет свойство количества
  setQuantity(quantity = 1) {
    this.quantity = quantity;
  }

  // функция для подсчета общей стоимости товара с учетом его количества
  getTotalPrice() {
    return this.quantity * this.price;
  }

  // Пытался модифицировать render() родителя, но пока что не придумал как лаконично вставить/изменить его return // пришлось переписать..
  renderCartItem() {
    return `<div>
                <img src="${this.imageSrc}" class="${this.imageClass}" alt="product image">
                <h3>${this.title}</h3>
                <p>Количество: ${this.quantity}</p>
                <p>Общая стоимость: ${this.getTotalPrice()}</p>
                <button>Удалить</button>
            </div>`
  }
}

// Решение 1-го задания
class Cart extends GoodsList {

  // Добавление товара в массив корзины
  pushToCart(item) {
    this.goods.push({title: item.title, price: item.price, quantity: 1});
  }

  // Увеличение количества единиц товара
  increaseQuantity(item) {
    item.quantity++;
  }

  // Проверка присутствия товара в корзине...
  isInCart(unknownItem, cartItem) {
    return unknownItem.title === cartItem.title;
  }

  // Главная функция для добавления товара в корзину... надеюсь не очень запутанно вышло
  addItemToCart(item) {
    let inCart = false;
    if (this.goods.length) {
      this.goods.forEach(good => {
        if (this.isInCart(item, good)) {
          this.increaseQuantity(good);
          inCart = true;
        }
      });
    } else {
      this.pushToCart(item);
      return;
    }
    if (!inCart) {
      this.pushToCart(item);
    }
  }

  // Удаление из корзины либо уменьшение количества единиц товара
  removeFromCart(item) {
    for (let idx = 0; idx < this.goods.length; idx++) {
      if (this.goods[idx].title === item.title) {
        if (this.goods[idx].quantity > 1)
          this.goods.quantity--;
        else
          this.goods.splice(idx, 1);
      }
    }
  }
}

const catalog = new GoodsList();
catalog.fetchGoods();
catalog.render();