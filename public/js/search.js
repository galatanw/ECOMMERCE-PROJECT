const search=document.getElementById("search")
const searchForm=document.getElementById("searchForm")
search.addEventListener("keyup",()=>{
    let value=new RegExp(search.value,"ig")
    axios
    .get('/products')
    .then((res)=>{
        if(search.value==""||search.value==" "){
        searchForm.innerHTML=""
        return
        }
        searchForm.innerHTML=""
    for (const iterator of res.data) {
        if(iterator.description.match(value)){
            searchForm.innerHTML+=`<a onclick="closeCart()" style="background-color: brown; width:100px;" href="#${iterator.description}"><li >${iterator.description}</li></a><hr>`
        }
    }
    })
})
const navMenuBtn = document.getElementById("menuBurger");
const navMenuTxt = document.getElementsByClassName("Navtext");
const navMenu = document.getElementById("navUl");
let openMenu = false;
navMenuBtn.addEventListener("click", () => {
  if (!openMenu) {
    navMenuBtn.classList.add("open");
    navMenu.classList.add("openMenu");
    navMenuTxt[0].classList.add("textAppear");
    navMenuTxt[1].classList.add("textAppear");
    navMenuTxt[2].classList.add("textAppear");
    navMenuTxt[3].classList.add("textAppear");
    openMenu = true;
    return;
  }
  navMenuBtn.classList.remove("open");
  navMenu.classList.remove("openMenu");
  navMenuTxt[0].classList.remove("textAppear");
  navMenuTxt[1].classList.remove("textAppear");
  navMenuTxt[2].classList.remove("textAppear");
  navMenuTxt[3].classList.remove("textAppear");

  openMenu = false;
});
function closeCart(){
  search.value=""
  searchForm.innerHTML=""
}