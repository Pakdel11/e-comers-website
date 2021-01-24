const navP = document.querySelector(".phone");
const toggleBtn = document.querySelector(".toggleBtnNav");
const links = document.getElementsByClassName(".link-p");
const link = document.querySelectorAll(".link-w");

var eg = true
toggleBtn.addEventListener("click", function(){        
        if(eg == true){
        console.log("its work");
        document.querySelector(".phone").style.cssText = "right: 0";
        document.querySelector(".links-p a").style.cssText = "color: #b4235d; text-decoration-color: #225; text-decoration: underline;";
        toggleBtn.style.cssText = "position: absolute; z-index: 1035;";
        eg = false
    }
    else if(eg == false){
        console.log("NOOOOOOOOOOOOOOO");
        document.querySelector(".phone").style.cssText = "right: -1000px;";
        eg = true
        toggleBtn.style.cssText = "position: relative; color: #eee;";
        
    }
});


// scroll code

const nav = document.querySelectorAll("#closeOpen");

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollpos = window.pageYOffset;
  if (prevScrollpos > currentScrollpos) {
    document.getElementById("header").style.cssText = "width: 70%; height: 10vh;";
    document.querySelector(".links-p a").style.cssText = "color: snow;";
    nav[0].style.cssText = "background: #eee;";
    nav[1].style.cssText = "background: #eee;";
    nav[2].style.cssText = "background: #eee;";
    
  } else {
    document.getElementById("header").style.cssText = "width: 90%; height: 8vh; padding: 0 10px;";
    nav[0].style.cssText = "background: #225;";
    nav[1].style.cssText = "background: #225;";
    nav[2].style.cssText = "background: #225;";
    


  }
  prevScrollpos = currentScrollpos;
};


// parches code



if(document.readyState == 'loading'){
  document.addEventListener("DOMContentLoaded", ready)
}else{
  ready();
}

function ready(){
  const removCarItemBtn = document.getElementsByClassName("btn-danger");
  for(let i = 0; i < removCarItemBtn.length; i++){
      var button = removCarItemBtn[i];
      button.addEventListener("click", removeCartItem)
  }
  
  const quantityInput = document.getElementsByClassName("cart-quantity-input");
  for(let i = 0; i < quantityInput.length; i++){
      var input = quantityInput[i]
      input.addEventListener("change", quantityChanged);
  }

  const addToCartBtns = document.getElementsByClassName("shop-item-button")
  for(let i = 0; i < addToCartBtns.length; i++){
          var button = addToCartBtns[i]
          button.addEventListener("click", addToCartClicked)
  }
  document.getElementsByClassName("btn-purchase")[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked(){
  alert("Tack för din beställning!")
  var cartItems = document.getElementsByClassName("cart-items")[0]
  while(cartItems.hasChildNodes()){
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotall();
}

function quantityChanged(e){
  var input = e.target
  if(isNaN(input.value) || input.value <= 0){
      input.value = 1
  }
  updateCartTotall()
}

function removeCartItem(e){
  var buttonClicked = e.target
  buttonClicked.parentElement.parentElement.remove()
  updateCartTotall()
}


function addToCartClicked(e){
  var button = e.target
  var shopItem = button.parentElement.parentElement
  var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText
  var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText
  var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src
  addItemToCart(title, price, imageSrc)
  updateCartTotall();
}

function addItemToCart(title, price, imageSrc){
  var cartRow = document.createElement('div')
  cartRow.innerText = title
  var cartItems = document.getElementsByClassName("cart-items")[0]
  cartRow.classList.add('cart-row')
  var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
  for(let i =0; i < cartItemNames.length; i++){
      if(cartItemNames[i].innerText == title){
          alert('This item is already added to the cart')
          return
      }
  }
  var cartRowContents = `
      <div class="cart-item cart-column">
          <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
          <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
      <div class="cart-quantity cart-column">
          <p class="achorPoint">Add</p>
          <input class="cart-quantity-input" type="number" value="1">
          <button class="btn btn-danger" type="button">REMOVE</button>
      </div>
  `
  cartRow.innerHTML = cartRowContents
  cartItems.append(cartRow)
  cartRow.getElementsByClassName("btn-danger")[0].addEventListener("click", removeCartItem)
  cartRow.getElementsByClassName("cart-quantity-input")[0].addEventListener("change", quantityChanged)

}



function updateCartTotall(){
  var cartItemContainer = document.getElementsByClassName("cart-items")[0];
  var cartRows= cartItemContainer.getElementsByClassName("cart-row");
  var total = 0
  for(let i = 0; i < cartRows.length; i++){
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName("cart-price")[0];
      var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)


}
total = Math.round(total * 100) / 100
document.getElementsByClassName("cart-total-price")[0].innerText = '$' + total;

}






