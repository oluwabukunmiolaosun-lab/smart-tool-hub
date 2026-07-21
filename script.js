// =======================
// HAMBURGER MENU
// =======================

function toggleMenu() {
    const menu = document.getElementById("mobileMenu");

    if (menu.style.display === "flex") {
        menu.style.display = "none";
    } else {
        menu.style.display = "flex";
    }
}

// =======================
// DARK/LIGHT MODE
// =======================

const themeBtn = document.getElementById("themeBtn");

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {
        localStorage.setItem("theme", "light");
        themeBtn.innerHTML = "☀️";
    } else {
        localStorage.setItem("theme", "dark");
        themeBtn.innerHTML = "🌙";
    }

}

window.onload = function () {

    const theme = localStorage.getItem("theme");

    if (theme === "light") {
        document.body.classList.add("light-mode");

        if (themeBtn) {
            themeBtn.innerHTML = "☀️";
        }
    }

};

// =======================
// SEARCH TOOLS
// =======================

const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const value = this.value.toLowerCase();

        const tools = document.querySelectorAll(".tool-card");

        tools.forEach(tool => {

            if (tool.textContent.toLowerCase().includes(value)) {
                tool.style.display = "block";
            } else {
                tool.style.display = "none";
            }

        });

    });

}

// =======================
// BACK TO TOP
// =======================

const topBtn = document.createElement("button");

topBtn.innerHTML = "⬆";
topBtn.id = "topBtn";

document.body.appendChild(topBtn);

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.onclick = function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

};

// =======================
// SCROLL ANIMATION
// =======================

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }

    });

});

sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});
// =======================
// AGE CALCULATOR
// =======================

function calculateAge() {

    const dob = document.getElementById("dob").value;
    const result = document.getElementById("result");

    if (!dob) {
        result.innerHTML = "<p>Please select your date of birth.</p>";
        return;
    }

    const birthDate = new Date(dob);
    const today = new Date();

    if (birthDate > today) {
        result.innerHTML = "<p>Date of birth cannot be in the future.</p>";
        return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
        days += previousMonth.getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    const diff = today - birthDate;

    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = Math.floor(diff / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const totalSeconds = Math.floor(diff / 1000);

    // Next birthday
    let nextBirthday = new Date(
        today.getFullYear(),
        birthDate.getMonth(),
        birthDate.getDate()
    );

    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const daysToBirthday = Math.ceil(
        (nextBirthday - today) / (1000 * 60 * 60 * 24)
    );

    result.innerHTML = `
        <div class="result-card">
            <h2>🎉 Your Age</h2>

            <p><strong>${years}</strong> Years, <strong>${months}</strong> Months, <strong>${days}</strong> Days</p>

            <hr>

            <p>📅 Total Months: <strong>${totalMonths}</strong></p>
            <p>📆 Total Weeks: <strong>${totalWeeks}</strong></p>
            <p>☀️ Total Days: <strong>${totalDays}</strong></p>
            <p>⏰ Total Hours: <strong>${totalHours}</strong></p>
            <p>⏱️ Total Minutes: <strong>${totalMinutes}</strong></p>
            <p>⌚ Total Seconds: <strong>${totalSeconds}</strong></p>

            <hr>

            <p>🎂 Next Birthday: <strong>${daysToBirthday}</strong> day(s)</p>
        </div>
    `;
}
// FAQ

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {
        item.classList.toggle("active");
    });

});
// =======================
// BMI CALCULATOR
// =======================

function calculateBMI(){

    const weight = parseFloat(document.getElementById("weight").value);
    const height = parseFloat(document.getElementById("height").value);

    const result = document.getElementById("bmiResult");

    if(!weight || !height){

        result.innerHTML="<p>Please enter both weight and height.</p>";
        return;

    }

    const bmi = weight / ((height/100)*(height/100));

    let status="";

    if(bmi<18.5){

        status="Underweight";

    }else if(bmi<25){

        status="Normal Weight";

    }else if(bmi<30){

        status="Overweight";

    }else{

        status="Obese";

    }

    result.innerHTML=`
    <div class="result-card">

        <h2>Your BMI</h2>

        <h1>${bmi.toFixed(1)}</h1>

        <p><strong>${status}</strong></p>

    </div>
    `;

}
// ===========================
// PASSWORD GENERATOR
// ===========================

function generatePassword(){

const length=parseInt(document.getElementById("length").value);

const upper="ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lower="abcdefghijklmnopqrstuvwxyz";

const number="0123456789";

const symbol="!@#$%^&*()_+?><[]{}";

let chars="";

if(document.getElementById("uppercase").checked)
chars+=upper;

if(document.getElementById("lowercase").checked)
chars+=lower;

if(document.getElementById("numbers").checked)
chars+=number;

if(document.getElementById("symbols").checked)
chars+=symbol;

if(chars===""){
alert("Select at least one option.");
return;
}

let password="";

for(let i=0;i<length;i++){

password+=chars.charAt(
Math.floor(Math.random()*chars.length)
);

}

document.getElementById("passwordOutput").value=password;

}

function copyPassword(){

const output=document.getElementById("passwordOutput");

output.select();

document.execCommand("copy");

alert("Password copied!");

}
// ===========================
// QR CODE GENERATOR
// ===========================

function generateQR(){

const text=document.getElementById("qrText").value;
const qr=document.getElementById("qrCode");

if(text===""){
alert("Please enter text or a URL.");
return;
}

qr.innerHTML="";

new QRCode(qr,{
text:text,
width:220,
height:220
});

}
// =======================
// WORD COUNTER
// =======================

function countWords(){

const text=document.getElementById("textInput").value;

const words=text.trim()===""
?0
:text.trim().split(/\s+/).length;

const characters=text.length;

const noSpaces=text.replace(/\s/g,"").length;

const sentences=text.trim()===""
?0
:text.split(/[.!?]+/).filter(s=>s.trim()!=="").length;

const paragraphs=text.trim()===""
?0
:text.split(/\n+/).filter(p=>p.trim()!=="").length;

const reading=Math.max(1,Math.ceil(words/200));

document.getElementById("wordResult").innerHTML=`

<p>Words: <strong>${words}</strong></p>

<p>Characters: <strong>${characters}</strong></p>

<p>Characters (No Spaces): <strong>${noSpaces}</strong></p>

<p>Sentences: <strong>${sentences}</strong></p>

<p>Paragraphs: <strong>${paragraphs}</strong></p>

<p>Reading Time: <strong>${reading} min</strong></p>

`;

}

function clearText(){

document.getElementById("textInput").value="";

countWords();

}
// =======================
// UNIT CONVERTER
// =======================

const units = {

length: {
Meter: 1,
Kilometer: 1000,
Centimeter: 0.01,
Mile: 1609.34,
Foot: 0.3048
},

weight: {
Kilogram: 1,
Gram: 0.001,
Pound: 0.453592,
Ounce: 0.0283495
}

};

const type = document.getElementById("conversionType");

if(type){

function loadUnits(){

const from = document.getElementById("fromUnit");
const to = document.getElementById("toUnit");

from.innerHTML="";
to.innerHTML="";

for(let unit in units[type.value]){

from.innerHTML += `<option>${unit}</option>`;
to.innerHTML += `<option>${unit}</option>`;

}

}

loadUnits();

type.addEventListener("change", loadUnits);

}

function convertUnit(){

const value = parseFloat(document.getElementById("inputValue").value);

const from = document.getElementById("fromUnit").value;

const to = document.getElementById("toUnit").value;

const category = document.getElementById("conversionType").value;

if(isNaN(value)){

document.getElementById("convertResult").innerHTML="Please enter a value.";

return;

}

const base = value * units[category][from];

const result = base / units[category][to];

document.getElementById("convertResult").innerHTML =

`<h2>${value} ${from} = ${result.toFixed(4)} ${to}</h2>`;

}
// =======================
// LOAN CALCULATOR
// =======================

function calculateLoan() {

    const amount = parseFloat(document.getElementById("loanAmount").value);
    const rate = parseFloat(document.getElementById("interestRate").value);
    const years = parseInt(document.getElementById("loanYears").value);

    const result = document.getElementById("loanResult");

    if (isNaN(amount) || isNaN(rate) || isNaN(years) ||
        amount <= 0 || rate < 0 || years <= 0) {

        result.innerHTML = "<p>Please enter valid values.</p>";
        return;
    }

    const monthlyRate = rate / 100 / 12;
    const payments = years * 12;

    let monthlyPayment;

    if (monthlyRate === 0) {
        monthlyPayment = amount / payments;
    } else {
        monthlyPayment =
            (amount * monthlyRate * Math.pow(1 + monthlyRate, payments)) /
            (Math.pow(1 + monthlyRate, payments) - 1);
    }

    const totalPayment = monthlyPayment * payments;
    const totalInterest = totalPayment - amount;

    result.innerHTML = `
        <h2>Loan Summary</h2>

        <p>💳 Monthly Payment: <strong>$${monthlyPayment.toFixed(2)}</strong></p>

        <p>💰 Total Payment: <strong>$${totalPayment.toFixed(2)}</strong></p>

        <p>📈 Total Interest: <strong>$${totalInterest.toFixed(2)}</strong></p>
    `;
}
