// Product Page and Cart Page
var row = document.getElementsByClassName("row row-cols-1 row-cols-sm-2 g-3")[0];
const url = "products.json";
let products = [];
let localData = localStorage.getItem("myProducts");
products = JSON.parse(localStorage.getItem("myProducts"));

loader();

function loader() {
    fetch(url)
        .then((rep) => rep.json())
        .then((data) => {
            products = data;
            maker();
            dynamic();
            savetoStorage();
        });
}

function maker() {
    row.innerHTML = " ";
    products.forEach((el, index) => {
        makeCards(el, index);
    });
}

function makeCards(item, index) {
    var productcol = document.createElement('div');
    productcol.className = "product col " + item.type;
    var card = document.createElement("div");
    card.className = "card";
    var button = document.createElement("button");
    button.className = "btn btn-link";
    button.dataset.bsToggle = "modal";
    button.dataset.bsTarget = "#modal";
    var img = document.createElement('img');
    img.src = item.display;
    img.className = "card-img-top";
    img.alt = "card-grid-image";
    var cardbody = document.createElement('div');
    cardbody.className = "card-body";
    var h5 = document.createElement('h5');
    h5.className = "card-title";
    h5.innerHTML = item.company;
    var cardtxt1 = document.createElement('p');
    cardtxt1.className = "card-text";
    cardtxt1.innerHTML = item.name;
    var cardtxt2 = document.createElement('p');
    cardtxt1.className = "card-text prices";
    cardtxt1.innerHTML = item.price;

    row.append(productcol);
    productcol.append(card);
    card.append(button);
    button.append(img);
    card.append(cardbody);
    cardbody.append(h5);
    cardbody.append(cardtxt1);
    cardbody.append(cardtxt2);
}

// stores img elements in as a collection then use loop to add eventlistner to each to open second web page
// !!! made i= 1 becuase the logo in nav is an image to
function dynamic() {
    var images = document.getElementsByClassName("card-img-top");
    for (let i = 0; i < images.length; i++) {
        images[i].addEventListener("click", function () {
            if (images[i] === images[i]) {
                openModal(i);
            }
        });
    }
}

function savetoStorage() {
    //   console.log(myList);
    localStorage.setItem("myProducts", JSON.stringify(products));
}


// using the index of products clicked 
// on click make the modal and call all 
// of the products info from json 
function openModal(index) {
    // console.log(index);
    var item = products[index];
    // // display all details

    // update images
    var preview = document.querySelector(".magnify-image");
    preview.src = item.display;
    var imgs = document.querySelectorAll(".img-options");
    imgs[0].src = item.display;
    imgs[1].src = item.option2;
    imgs[2].src = item.option3;
    imgs[3].src = item.option4;

    // update content
    var container = document.querySelector(".info-container");
    var children = container.children;
    var company = children[0];
    var name = children[1];
    var price = children[2];
    var desc = children[3];

    company.innerHTML = item.company;
    name.innerHTML = item.name;
    price.innerHTML = item.price;
    desc.innerHTML = item.description;


    var change = document.querySelector(".qty");
    var p = item.price;

    var display = document.querySelectorAll("option")[6];
    change.addEventListener("change", () => {
        // console.log(p);
        var selectop = change.value;
        // console.log(selectop);
        if (selectop == "1") {
            p *= 1
            var text = "Price: " + p + ".00";
            display.innerHTML = text;
        } else if (selectop == "2") {
            p *= 2
            display.innerHTML = "Price: " + (p) + ".00";
        } else if (selectop == "3") {
            p *= 3
            display.innerHTML = "Price: " + (p) + ".00";
        } else if (selectop == "4") {
            p *= 4
            display.innerHTML = "Price: " + (p) + ".00";
        } else if (selectop == "5") {
            p *= 5
            display.innerHTML = "Price: " + (p) + ".00";
        }

    });

    var checkout = document.querySelector(".check");

    checkout.addEventListener('click', () => {
        var selectop = change.value;
        if (selectop == "QTY") {
            var qty = 1;
        } else {
            var qty = Number(selectop);
        }
    })

    // magnify("myimage", 2);
}


var moisturizer = document.getElementById("moisturizer");
var cleanser = document.getElementById("cleanser");
var sunscreen = document.getElementById("sun-screen");
var bundles = document.getElementById("bundles");
var vegan = document.getElementById("vegan");

var mainCol = document.getElementsByClassName("product col");

moisturizer.addEventListener("click", function () {
    Array.from(mainCol).forEach((element) => {
        if (element.className === "product col moisturizer") {
            element.style.visibility = "visible ";
            element.style.order = 1;
        } else {
            element.style.visibility = "hidden";
            element.style.order = 2;
        }
    });
});

cleanser.addEventListener("click", function () {
    Array.from(mainCol).forEach((element) => {
        if (element.className === "product col cleanser") {
            element.style.visibility = "visible ";
            element.style.order = 1;
        } else {
            element.style.visibility = "hidden";
            element.style.order = 2;
        }
    });
});

sunscreen.addEventListener("click", function () {
    Array.from(mainCol).forEach((element) => {
        if (element.className === "product col sunscreen") {
            element.style.visibility = "visible ";
            element.style.order = 1;
        } else {
            element.style.visibility = "hidden";
            element.style.order = 2;
        }
    });
});

bundles.addEventListener("click", function () {
    Array.from(mainCol).forEach((element) => {
        if (
            element.className === "product col bundles" ||
            element.className === "product col vegan bundles"
        ) {
            element.style.visibility = "visible ";
            element.style.order = 1;
        } else {
            element.style.visibility = "hidden";
            element.style.order = 2;
        }
    });
});

vegan.addEventListener("click", function () {
    Array.from(mainCol).forEach((element) => {
        if (element.className === "product col vegan bundles") {
            element.style.visibility = "visible ";
            element.style.order = 1;
        } else {
            element.style.visibility = "hidden";
            element.style.order = 2;
        }
    });
});

// compare prices
var prices = [];
for (var i = 0; i < products.length; i++) {
    item = products[i];
    prices[i] = item.price;
}


// highest to lowest
prices.sort((a, b) => a - b);

function duplicates(prices) {
    return prices.filter((item,
        index) => prices.indexOf(item) === index);
}
var prices = duplicates(prices)


setTimeout(() => {
    const ps = document.querySelectorAll('.prices');
    var highLow = document.getElementById("high-low");
    highLow.addEventListener('click', () => {
        a = 0;
        for (i = 0; i < products.length; i++) {
            // compare each price with each ps innerHTML value
            var y = prices[i];
            // console.log(y);
            for (j = 0; j < 5; j++) {
                var z = ps[j]
                var x = ps[j].innerHTML


                if (y === x) {
                    // console.log(z)
                    var col = z.offsetParent.parentElement;
                    console.log(col)
                    col.style.order = a;
                    a++;
                }
            }
        }
    })
}, 100);

//lowest to highest
prices.sort((a, b) => b - a);
function duplicates(prices) {
    return prices.filter((item,
        index) => prices.indexOf(item) === index);
}
var prices = duplicates(prices)

setTimeout(() => {
    const ps = document.querySelectorAll('.prices');
    var lowHigh = document.getElementById("low-high");
    lowHigh.addEventListener('click', () => {
        b = 4;
        for (i = 0; i < products.length; i++) {
            // compare each price with each ps innerHTML value
            var y = prices[i];
            // console.log(y);
            for (j = 0; j < 5; j++) {
                var z = ps[j]
                var x = ps[j].innerHTML;

                if (y === x) {
                    // console.log(z)
                    var col = z.offsetParent.parentElement;
                    console.log(col)
                    col.style.order = b;
                    b--;
                }
            }
        }
    })
}, 100);


//change preview image when option is clicked
var options = document.querySelectorAll('.img-options');
var preview = document.querySelectorAll(".preview")[0];
var image = preview.children[0];

nodes = Array.prototype.slice.call(options, 0);
// nodes is an array now.
nodes.forEach(function (element) {
    element.addEventListener('click', () => {
        image.src = element.src
        // magnify("myimage", 2);
    })
});

// function magnify(imgID, zoom) {
//     var img, glass, w, h, bw;
//     img = document.getElementById(imgID);
//     console.log(img)
//     console.log(img.src)
//     /*create magnifier glass:*/
//     var element = document.getElementsByClassName('img-magnifier-glass');
//     console.log(element)
//     glass = document.createElement("DIV");
//     glass.setAttribute("class", "img-magnifier-glass");
//     /*insert magnifier glass:*/
//     img.parentElement.insertBefore(glass, img);
//     /*set background properties for the magnifier glass:*/
//     glass.style.backgroundImage = "url('" + img.src + "')";
//     glass.style.backgroundRepeat = "no-repeat";
//     glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
//     bw = 3;
//     w = glass.offsetWidth / 2;
//     h = glass.offsetHeight / 2;
//     /*execute a function when someone moves the magnifier glass over the image:*/
//     glass.addEventListener("mousemove", moveMagnifier);
//     img.addEventListener("mousemove", moveMagnifier);
//     /*and also for touch screens:*/
//     glass.addEventListener("touchmove", moveMagnifier);
//     img.addEventListener("touchmove", moveMagnifier);
//     function moveMagnifier(e) {
//         var pos, x, y;
//         /*prevent any other actions that may occur when moving over the image*/
//         e.preventDefault();
//         /*get the cursor's x and y positions:*/
//         pos = getCursorPos(e);
//         x = pos.x;
//         y = pos.y;
//         /*prevent the magnifier glass from being positioned outside the image:*/
//         if (x > img.width - (w / zoom)) { x = img.width - (w / zoom); }
//         if (x < w / zoom) { x = w / zoom; }
//         if (y > img.height - (h / zoom)) { y = img.height - (h / zoom); }
//         if (y < h / zoom) { y = h / zoom; }
//         /*set the position of the magnifier glass:*/
//         glass.style.left = (x - w) + "px";
//         glass.style.top = (y - h) + "px";
//         /*display what the magnifier glass "sees":*/
//         glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
//     }
//     function getCursorPos(e) {
//         var a, x = 0, y = 0;
//         e = e || window.event;
//         /*get the x and y positions of the image:*/
//         a = img.getBoundingClientRect();
//         /*calculate the cursor's x and y coordinates, relative to the image:*/
//         x = e.pageX - a.left;
//         y = e.pageY - a.top;
//         /*consider any page scrolling:*/
//         x = x - window.pageXOffset;
//         y = y - window.pageYOffset;
//         return { x: x, y: y };
//     }
// }