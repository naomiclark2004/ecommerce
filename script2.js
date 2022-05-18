var link = document.getElementsByClassName("btn-link");
for (let i = 0; i < link.length; i++) {
  link[i].addEventListener("click", function(){
    location.href='products.html';
  });
}