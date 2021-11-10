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
            searchForm.innerHTML+=`<a href="/singleProudctHbs/${iterator._id}" style="background-color: brown; width:100px;"><li>${iterator.description}</li></a><hr>`
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

const contactForm =document.getElementById("contactForm")
const contactName =document.getElementById("contactName")
const contactEmail =document.getElementById("contactEmail")
const contactMessage =document.getElementById("contactMessage")
  
contactForm.addEventListener("submit",(e)=>{
  e.preventDefault()
  axios
  .post("/contacts",{email:contactEmail.value,name:contactName.value,message:contactMessage.value})
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  })
  .then()
})