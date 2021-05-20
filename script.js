// Решение 1-го задания
const makeGETRequest = (url) => {
  return new Promise((resolve, reject) => {
    let xhr;

    if (window.XMLHttpRequest)
      xhr = new XMLHttpRequest();
    else if (window.ActiveXObject)
      xhr = new ActiveXObject("Microsoft.XMLHTTP");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(xhr.status);
        }
      }
    }

    xhr.open('GET', url, true);
    xhr.send();
  });
}

class GoodsItem {
  constructor(product_name = 'unknown', price = 0, currency = '$', imageSrc = 'images/empty-image.svg', imageClass = 'goods-item-empty') {
    this.product_name = product_name;
    this.price = price;
    this.currency = currency;
    this.imageSrc = imageSrc;
    this.imageClass = imageClass;
  }

  render() {
    return `<div class="goods-item">
                <img src="${this.imageSrc}" class="${this.imageClass}" alt="product image">
                <h3>${this.product_name}</h3>
                <p>${this.currency}${this.price}</p>
                <button data-good-id="${this.product_name}">Купить</button>
            </div>`;
  }
}

class GoodsList {
  constructor() {
    this.goods = [];
    this.API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
  }

  // Решение 3-го задания. Часть 1
  fetchGoods() {
    return new Promise(resolve => {
      makeGETRequest(`${this.API_URL}/catalogData.json`)
          .then((goods) => {
            this.goods = JSON.parse(goods);
            resolve();
          }).catch((error) => {
            console.log(`Error: ${error}`);
      })
    })
  }

  // Проверка нажатия на кнопку покупки в каталоге
  purchaseHandler(event, cart) {
    if (event.target.tagName === 'BUTTON') {
      this.goods.forEach(good => {
        if (good.product_name === event.target.dataset.goodId) {
          cart.addItemToCart(good);
          cart.render();
        }
      });
    }
  }

  calculateTotalPrice(quantity = 1) {
    return this.goods.reduce((sum, good) => {
      return sum + (good.price * quantity);
    }, 0);
  }

  render() {
    let html = '';
    this.goods.forEach(good => {
      let goodItem = new GoodsItem(good.product_name, good.price);
      html += goodItem.render();
    });
    document.querySelector('.goods-list').innerHTML = html;
  }
}

class CartItem extends GoodsItem {
  constructor(product_name, price, quantity = 1, currency, imageSrc, imageClass) {
    super(product_name, price, currency, imageSrc, imageClass);
    this.quantity = quantity;
  }

  getTotalPrice() {
    return this.quantity * this.price;
  }

  render() {
    return `<div class="goods-item">
                <img src="${this.imageSrc}" class="${this.imageClass}" alt="product image">
                <h3>${this.product_name}</h3>
                <p>Количество: ${this.quantity}</p>
                <p>Общая стоимость: ${this.getTotalPrice()}</p>
                <button data-good-id="${this.product_name}">Удалить</button>
            </div>`
  }
}

class Cart extends GoodsList {
  pushToCart(item) {
    this.goods.push({product_name: item.product_name, price: item.price, quantity: 1});
  }

  increaseQuantity(item) {
    item.quantity++;
  }

  isInCart(unknownItem, cartItem) {
    return unknownItem.product_name === cartItem.product_name;
  }

  // Решение 2-го задания
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

  // Проверка нажатия на кнопку удаления из корзины
  removeHandler(event) {
    if (event.target.tagName === 'BUTTON') {
      this.goods.forEach(good => {
        if (event.target.dataset.goodId === good.product_name) {
          this.removeFromCart(good);
        }
      });
    }
  }

  // Решение 2-го задания
  removeFromCart(item) {
    for (let idx = 0; idx < this.goods.length; idx++) {
      if (this.goods[idx].product_name === item.product_name) {
        if (this.goods[idx].quantity > 1)
          this.goods[idx].quantity--;
        else
          this.goods.splice(idx, 1);
      }
    }
    this.render();
  }

  // Решение 2-го задания // Не уверен до конца, но мне показалось более логичным переписать метод рендер для корзины из-за необходимости создать CartItem и обращения к блоку .cart-list
  render() {
    let html = ``;
    this.goods.forEach(good => {
      let cartItem = new CartItem(good.product_name, good.price, good.quantity);
      html += cartItem.render();
    });
    document.querySelector('.cart-list').innerHTML = html;
  }
}

const catalog = new GoodsList();
const cart = new Cart();

// Решение 3-го задания. Часть 2
catalog.fetchGoods()
    .then(() => {
      catalog.render();
    });

cart.render();

document.querySelector('.goods-list')
    .insertAdjacentHTML('beforebegin', `<h2>Каталог</h2>`);
document.querySelector('.cart-list')
    .insertAdjacentHTML('beforebegin',  `<h2>Корзина</h2>`);

document.querySelector('.goods-list')
    .addEventListener('click', event => {
      catalog.purchaseHandler(event, cart);
    });
document.querySelector('.cart-list')
    .addEventListener('click', event => {
      cart.removeHandler(event);
    });