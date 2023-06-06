
let BudegtAmount = document.getElementById("BudegtAmount");
let Category = document.getElementById("Category");
let setbutton = document.getElementById("setbutton");
let TotalAmount = document.getElementById("TotalAmount");
let date = document.getElementById("date");
let SubmintButton = document.getElementById("SubmintButton");
let setBudget = document.getElementById("setTotal");
let Expenses = document.getElementById("Expenses");
let mainBudget = document.getElementById("mainBudget");
let balance = document.getElementById("balance");
let table = document.getElementById("table");
let display = document.getElementById("display")
let subBtn = SubmintButton.innerText;
let editId = null;

let arrayOfAmount = [];
let myArr = [];

let arr1 = localStorage.getItem("expense", "amount")
if(arr1 !== null){
  myArr = JSON.parse(arr1);
}

setbutton.onclick =()=>{
  let BudegtAmount2 = +BudegtAmount.value;
  localStorage.setItem("Amount2", BudegtAmount2)
  let store = +localStorage.getItem("Amount2");
  BudegtAmount2 = JSON.parse(store)
  setBudget.innerText =  + BudegtAmount2;
if(BudegtAmount === 0){
  setBudget.innerText = + BudegtAmount2;
}
showbal()
}

SubmintButton.onclick =()=>{
 let Category2 = Category.value;
 let TotalAmount2 = +TotalAmount.value;
 let date2 = date.value;
 if(editId !== null){ 
   myArr.splice(editId, 1, {"expenses" : Category2,
   "Amount1" : TotalAmount2, "date" : date2 } )
   editId = null;
 }else{
 myArr.push({"expenses" : Category2,
"Amount1" : TotalAmount2, "date" : date2 });
 }
arrayOfAmount.push(+TotalAmount2);
Category.value = "";
TotalAmount.value = "";
date.value = "";
 arr2()
 summ()
 dataset();
SubmintButton.innerText = subBtn;
}

function dataset(){
  let Storagee = JSON.stringify(myArr);
  localStorage.setItem("expense", Storagee, "Amount", Storagee);
}

function summ(){
  let sum = 0;
  for (let i = 0; i <arrayOfAmount.length; i++) {
    let elt = parseInt(+arrayOfAmount[i]);
    sum += elt;
  }
  Expenses.innerText = + sum;
  showbal()
}
function editinfo(id) {
  editId = id;
  Category.value = myArr[id].expenses;
  TotalAmount.value = myArr[id].Amount1;
  date.value = myArr[id].date
  SubmintButton.innerText = "Save" 
  }

function showbal() {
  let amount3 =  +BudegtAmount.value;
  let sum1 = 0;
  for (let i = 0; i <arrayOfAmount.length; i++) {
    let elt2 = parseInt(+arrayOfAmount[i]);
    sum1 += elt2;
  let balanceshow =  amount3-sum1;
balance.innerHTML = + balanceshow;
}
}

function deletebutton (id){
  myArr.splice(id, 1)
  dataset();
  arr2();
}

function arr2 () {
  let display = "";
     
    myArr.forEach((a, i) => {
       display += `
       <tr>
         <th >${i+1}</th>
         <td>${a.expenses}</td>
         <td>${a.Amount1}</td>
         <td>${a.date}</td>
         <td><i class="bi bi-pencil-square" onclick="editinfo(${i})" ></i>   
             <i class="bi bi-trash3-fill" onclick="deletebutton(${i})" ></i></td>
       </tr> `
   });
   table.innerHTML = display; 
}
