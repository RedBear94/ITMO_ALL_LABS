function clckFunc() {
  this.textContent = this.id;
}

document.querySelector('#bt1')
  .addEventListener('click', clckFunc);

document.querySelector('#bt2')
  .addEventListener('click', ({ target }) => target::clckFunc()); //has to be called, not only binded
