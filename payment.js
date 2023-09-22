const backBtn = document.querySelector("#back-btn")
const tCount = document.querySelector("#tickets-count")
const form = document.querySelector("#form")


let movievTitle = localStorage.getItem("mvTitle")
let moviePrice = localStorage.getItem("mvPrice")

document.querySelector("#movie-name").innerText = `${movievTitle}`
document.querySelector("#cost-per-ticket").innerText = `${moviePrice}`

backBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.history.back()
})


function calculateSubTotal(){
    
    let countOfTicket = Number(tCount.value)
    const sTotal = document.querySelector("#sub-total")
    
    let pricePerTicket = Number(moviePrice)
   
    let totalTicketPrice = countOfTicket * pricePerTicket

    let cFee = (totalTicketPrice * 1.75)/100

    document.querySelector("#convenience-fee").innerText = `${cFee}`

    let subT = totalTicketPrice + cFee
    
    sTotal.innerText = `${subT.toFixed(2)}`
}


tCount.addEventListener("change", calculateSubTotal);



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    alert("Booked Tickets Successfully !")

    window.location.href = `index.html`
})