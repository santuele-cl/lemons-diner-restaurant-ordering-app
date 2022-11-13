import { menuArray } from "./data.js"

// const orderList = []
let pizzaOrderList = []
let hamburgerOrderList = []
let beerOrderList = []
const orderDetailsList = []

const formEl = document.getElementById('form-el')
formEl.addEventListener('submit', function(event) {
    event.preventDefault()
})

document.addEventListener('click', function(event) {
    if (event.target.dataset.add) {
        handleAddOrderBtnClick(event.target.dataset.add)
    } 
    else if (event.target.dataset.remove) {
        handleRemoveOrderBtnClick(event.target.dataset.remove)
    }
    else if (event.target.id === 'complete-order-btn') {
        handleCompleteOrderBtnClick()
    }
    else if (event.target.id === 'close-modal-btn') {
        handleCloseModalBtnClick()
    }
    else if (event.target.id === 'cta-pay') {
        handlePayBtnClick()
    }
})

function handlePayBtnClick() {
    const cxName = document.getElementById('cx-name')
    const cxCardNum = document.getElementById('cx-card-num')
    const cxCvv = document.getElementById('cx-cvv')
    if(cxName.value && cxCardNum.value && cxCvv.value) {
        orderDetailsList.push({
            name: cxName.value,
            cardNumber: cxCardNum.value,
            cvv: cxCvv.value,
            order: pizzaOrderList, hamburgerOrderList, beerOrderList
        })
        pizzaOrderList = []
        hamburgerOrderList = []
        beerOrderList = []
        
        document.getElementById('modal-payment-prompt').style.display = 'none'
        document.getElementById('order-preview').style.display = 'none'
        document.getElementById('confirmation-message-box').innerHTML = `
            <p>Thank you, ${cxName.value}! Your order is on its way!
        `
        document.getElementById('confirmation-message-box').style.display = 'block'
        cxName.value =''
        cxCardNum.value = ''
        cxCvv.value = ''
    }
    
}

function handleAddOrderBtnClick(menuId) {
    document.getElementById('order-preview').style.display = 'block'
    document.getElementById('confirmation-message-box').style.display = 'none'
    const selectedMenu = menuArray.filter( function(menu) {
        return menu.id === menuId
    })[0]
 
    if (selectedMenu.id === "0") {pizzaOrderList.push(selectedMenu)}
    else if (selectedMenu.id === "1") {hamburgerOrderList.push(selectedMenu)}
    else if (selectedMenu.id === "2") {beerOrderList.push(selectedMenu)}
    renderOrderPreviewHTML()
}
function handleRemoveOrderBtnClick(orderId) {
    if (orderId === "0") {pizzaOrderList.pop()}
    else if (orderId === "1") {hamburgerOrderList.pop()}
    else if (orderId === "2") {beerOrderList.pop()}
    renderOrderPreviewHTML()
}
function handleCompleteOrderBtnClick() {
    document.getElementById('modal-payment-prompt').style.display = 'block'
}
function handleCloseModalBtnClick() {
    document.getElementById('modal-payment-prompt').style.display = 'none'
}


function getMenuItemsHTML() {
    // Iterate over menuArray and create HTML codes based on it
    let menuItemsHTML = ``
    menuArray.forEach( function(menu) {
        let itemIngredients = '' 
        menu.ingredients.forEach(function(ingredient) {
            itemIngredients += `${ingredient} `
        })
        menuItemsHTML += `
            <div class="menu-item">
                <p class="menu-emoji">${menu.emoji}</p>
                <div class="menu-info">
                    <h2 class="menu-name">${menu.name}</h2>
                    <p class="menu-ingredients">${itemIngredients}</p>
                    <p class="menu-price">$${menu.price}</p>
                </div>
                <i 
                    class="menu-add-btn fa-solid fa-plus"
                    data-add="${menu.id}"></i>
            </div>
        ` 
    })
    return menuItemsHTML
}
function renderMenuItemsHTML() {
    document.getElementById("menu-items").innerHTML = getMenuItemsHTML()
}

function getOrderPreviewHTML() {
    // Default visibility of Order Preview is hidden
    let orderPreviewVisibility = `hidden`
    let pizzaOrderPreviewVisibilty = `hidden`
    let hamburgerOrderPreviewVisibilty = `hidden`
    let beerOrderPreviewVisibilty = `hidden`

    let orderPreviewHTML = ``
    // Checking if order is EMPTY
    if (pizzaOrderList.length + hamburgerOrderList.length + beerOrderList.length) {
        
        // ---UNHIDE PREVIEW ITEMS IF SELECTED---
        // Unhide PIZZA PREVIEW if a pizza is selected
        if (pizzaOrderList.length) {pizzaOrderPreviewVisibilty = ``}    
        // Unhide HAMBURGER PREVIEW if a hamburger is selected
        if (hamburgerOrderList.length) {hamburgerOrderPreviewVisibilty = ``}
        // Unhide BEER PREVIEW if a beer is selected
        if (beerOrderList.length) {beerOrderPreviewVisibilty = ``}

        orderPreviewVisibility = ``
        orderPreviewHTML = `
            <div class="order-preview ${orderPreviewVisibility}">
                <h3 class="order-preview-title">Your order</h3>
                <div>

                    <div class="sb-flex">
                        <div class="IB-child ${pizzaOrderPreviewVisibilty}">
                            <p class="order-preview-subtitle ${pizzaOrderPreviewVisibilty}">Pizza</p>
                            <button class="btn-remove" data-remove="0">remove</button>
                        </div>
                        <p class="order-preview-subtitle ${pizzaOrderPreviewVisibilty}"><span class="op-normal">${[pizzaOrderList.length]} x 14 =</span> $${pizzaOrderList.length*14}</p>
                    </div>

                    <div class="sb-flex">
                        <div class="IB-child ${hamburgerOrderPreviewVisibilty}">
                            <p class="cta-after order-preview-subtitle ${hamburgerOrderPreviewVisibilty}">Hamburger</p>
                            <button class="btn-remove" data-remove="1">remove</button>
                        </div>
                        <p class="order-preview-subtitle ${hamburgerOrderPreviewVisibilty}"><span class="op-normal">${hamburgerOrderList.length} x 12 =</span> $${hamburgerOrderList.length*12}</p>
                    </div>

                    <div class="sb-flex">
                        <div class="IB-child ${beerOrderPreviewVisibilty}">
                            <p class="cta-after order-preview-subtitle ${beerOrderPreviewVisibilty}">Beer</p>
                            <button class="btn-remove" data-remove="2">remove</button>
                        </div>
                        <p class="order-preview-subtitle ${beerOrderPreviewVisibilty}"><span class="op-normal">${beerOrderList.length} x 12 =</span> $${beerOrderList.length*12}</p>
                    </div>

                </div>
                <div class="line-break"></div>
                <div class="sb-flex">
                    <p class="order-preview-subtitle">Total price:<p>
                    <p class="order-preview-subtitle">$
                    ${ pizzaOrderList.length*14 + hamburgerOrderList.length*12 + beerOrderList.length*12}
                    </p>
                </div>
                <button class="btn complete-order-btn" id="complete-order-btn">Complete Order</button>
            </div>
        `
    }
    return orderPreviewHTML
}
function renderOrderPreviewHTML() {
    document.getElementById("order-preview").innerHTML = getOrderPreviewHTML()
}

function render() {
    renderMenuItemsHTML()
    renderOrderPreviewHTML()
}
render()
