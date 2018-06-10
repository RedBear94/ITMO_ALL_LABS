"use strict()";

const max = 10000; 
const maxElem = document.querySelector('#cart__max-num'),
      restElem = document.querySelector('#cart__rest-num'),
      sumElem = document.querySelector('#cart__sum-num'),
      shopElem = document.querySelector('#shop__list'),
      cartElem = document.querySelector('#cart__list'),
      items = [],
      cart = [[], []];
let rest = max,
    sum = 0;
maxElem.textContent = max;
restElem.textContent = rest;
sumElem.textContent = sum;

fetch('items.json').then(res => {
  res.json().then(itemsList => {
    itemsList.forEach((item) => {
      items.push(item);

      let newChild = document.createElement('li');
      newChild.classList.add('item');
      newChild.setAttribute('draggable', 'true');
      newChild.dataset.id = item.id;
      newChild.addEventListener('dragstart', e => {
        e.dataTransfer.setData('id', e.target.dataset.id);
        e.dataTransfer.setData('el', e.target.outerHTML);
      })
      newChild.innerHTML = `
        <p class="item__name">${item.name}</p>
        <small class="item__price">${item.price}$</small>
      `;
      shopElem.appendChild(newChild);
    });
  })
});

function calculate(e){
  console.log('calc', e.target);
  const item = items[e.detail.id]; 
  const itemIndex = cart[0].indexOf(item.id);
  item.count = e.detail.count;
  if(item.count > 0){
    if( item.price <= rest){      
      if(itemIndex === -1){
        cart[0].push(item.id);
        item.count = 1;
        cart[1].push(item.count);
      } else {
        cart[1][itemIndex]++;
        item.count = cart[1][itemIndex];
      }
      rest -= item.price; restElem.textContent = rest;
      sum += item.price; sumElem.textContent = sum;
      cartElem.dispatchEvent(new CustomEvent('renderItems', {
        detail: {
          index: itemIndex,
          item: item
        }
      }))
    } else {
      cartElem.parentNode.classList.add('error'); setTimeout(() => {cartElem.parentNode.classList.remove('error')}, 650);
    }
  } else {
    cart[1][itemIndex]--;
    item.count = cart[1][itemIndex];
    if(cart[1][itemIndex] <= 0){
      cart[0].splice(itemIndex, 1);
      cart[1].splice(itemIndex, 1);
    }
    rest += item.price; restElem.textContent = rest;
    sum -= item.price; sumElem.textContent = sum;
    cartElem.dispatchEvent(new CustomEvent('renderItems', {      
      detail: {
        index: itemIndex,
        item: item
      }
    }))
  }
}

function renderItems(e){
  console.log(e.detail);
  let item = e.detail.item;
  if(item.count > 0){
    if(e.detail.index === -1){
      let newChild = document.createElement('li');
      newChild.classList.add('item');
      newChild.dataset.id = item.id;
      newChild.innerHTML = `
          <p class="item__name">${item.name}</p>
          <small class="item__price">${item.price}$</small>
            x <span class="item__count">${item.count}</span>
          = <span class="item__total">${item.price * item.count}</span>$
        `;
      newChild.addEventListener('dblclick', e => {
        e.preventDefault();
        cartElem.dispatchEvent(new CustomEvent('calcCart', { 
          detail: {
            id: e.target.dataset.id,
            count: -1
          }
        }))
      });
      cartElem.appendChild(newChild);
      console.log('append', newChild);
    } else {
      let elem = cartElem.childNodes[e.detail.index];
      elem.querySelector('.item__count').textContent = item.count;
      elem.querySelector('.item__total').textContent = item.price * item.count
    }
  } else {
    console.log('remove', cartElem.childNodes[e.detail.index]);
    cartElem.removeChild(cartElem.childNodes[e.detail.index])
  }
}

cartElem.addEventListener('dragover', e => {
  e.preventDefault();
});
cartElem.addEventListener('drop', e => {
  e.preventDefault();
  cartElem.dispatchEvent(new CustomEvent('calcCart', { 
    detail: {
      id: parseInt(e.dataTransfer.getData('id')),
      count: 1
    }
  }));
});
cartElem.addEventListener('calcCart', calculate, event);
cartElem.addEventListener('renderItems', renderItems, event);

setTimeout(()=>{document.querySelector('#hint').style.opacity = '0.2'},2000);
