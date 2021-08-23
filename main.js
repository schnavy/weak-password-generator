const body = document.querySelector("body")
const button = document.querySelector("button")
const pwString = document.querySelector("#pw")
const pwField = document.querySelector(".pw-field")
const copyAlert = document.querySelector(".copy-alert")

newPW()
button.addEventListener("click", (e)=>{
    newPW()
})
pwField.addEventListener("click", (e)=>{
    copy()
})


function newPW() {
    let r = Math.floor(Math.random()*pws.length);
    pwString.value = pws[r]
}



  function copy() {
    const pwString = document.querySelector("#pw")
    // pwString.select();
    // pwString.setSelectionRange(0, 99999); /* For mobile devices */
  
    navigator.clipboard.writeText(pwString.value)
    .then(() => alertCopy())
    .catch((error) => console.error(error));
  
    // alert("Copied the text: " + pwString.value);
  }

  function alertCopy(){
    copyAlert.classList.add("active")
    setTimeout(() => {
        copyAlert.classList.remove("active")
    }, 3000);
  }