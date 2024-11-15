const currencySelectionContainer = document.querySelector("#currencySelectionMainContainer");
const currencySelectionContainer1 = document.querySelector("#currencySelectionMainContainer1");
let currencyDisplayer = document.querySelector("#currentCurrencyDisplayer");
let currencyDisplayer1 = document.querySelector("#currentCurrencyDisplayer1");
const dropdownMenu = document.querySelector("#dropdownMenuContainer");
const dropdownMenu1 = document.querySelector("#dropdownMenuContainer1");
let usaText = document.getElementById('usaText');
let text = usaText.textContent;
let pakText = document.getElementById('pakText');
const currencies = document.querySelectorAll(".currencies");
const currencies1 = document.querySelectorAll(".currencies1");
let flagImg = document.getElementById('usFlag');
let flagImg1 = document.getElementById('pakFlag');
const exchangeCurrencies = document.getElementById('exchangeArrows');
let dataPrompter = document.getElementById("gettingDataPrompt");
let amountPrompter = document.getElementById('amountText');
let amountPlaceholder = parseFloat(amountPrompter.getAttribute('placeholder'));
const button = document.getElementById('btn');
const URL = "https://v6.exchangerate-api.com/v6/f546e8696bffd0a58a75f93f/latest/USD";


const buttonClicking = () => {
    let inputValue = parseFloat(amountPrompter.value);
    if (inputValue <= 0) {
        dataPrompter.innerText = "Invalid Number";
    } else {
        amountPrompter.setAttribute('placeholder', 'Enter amount');
    }
};



const exchangeRateInfo = async () => {
    try {
        dataPrompter.innerText = "Getting exchange rates....";

        let response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        let jsonResponse = await response.json();
        let data = jsonResponse;

        let currency = usaText.textContent;
        let currency1 = pakText.textContent;
        const btnClick =  () => {
            let inputValue = parseFloat(amountPrompter.value);

            // Use placeholder value if input is invalid
            if (isNaN(inputValue)) {
                inputValue = amountPlaceholder;
            } else {
                // Update the placeholder with the new input value if valid
                amountPlaceholder = inputValue;
            }
            if(inputValue === 1 || inputValue !== 1 ){
              
            // Perform the conversion
            let conversion = inputValue *(data.conversion_rates[currency1] / data.conversion_rates[currency]);
            
            // Update the display
            dataPrompter.innerText = `${inputValue} ${currency} = ${conversion} ${pakText.textContent}`;
        }
            }
            btnClick();
       // Function to handle the conversion on button click
function handleButtonClick() {
    btnClick(); 
    buttonClicking();
}


button.addEventListener('click', handleButtonClick);

// Event listener for "Enter" key press
amountPrompter.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default form submission
        handleButtonClick(); // Trigger the same logic as button click
    }
});
        
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        if (dataPrompter) {
            dataPrompter.innerText = "Failed to get exchange rates.";
        }
    }
}

exchangeRateInfo();



const swapCurrencyText = (event) => {
    const clickedElement = event.target;

   if (clickedElement.classList.contains("currencies")) {
        const tempText = usaText.textContent;
        usaText.textContent = clickedElement.textContent;
        flagImg.src = clickedElement.getAttribute("data-flag");
        exchangeRateInfo();
    }
   
};
dropdownMenu.addEventListener('click', swapCurrencyText);

const swapCurrencyText1 = (event) => {
    const clickedElement = event.target;

    if (clickedElement.classList.contains("currencies1")) {
        const tempText = pakText.textContent;
        pakText.textContent = clickedElement.textContent;
        flagImg1.src = clickedElement.getAttribute("data-flag1");
        exchangeRateInfo();
    }
};
dropdownMenu1.addEventListener('click', swapCurrencyText1);

const dropdownMenuAppear = () => {
     if(dropdownMenu.style.display === 'none'){
        dropdownMenu.style.display = 'block';
     } else {
        dropdownMenu.style.display = 'none'; // Hide the menu
    }
};
const dropdownMenuAppear1 = () => {
    if(dropdownMenu1.style.display === 'none'){
       dropdownMenu1.style.display = 'block';
    } else {
       dropdownMenu1.style.display = 'none'; // Hide the menu
   }
};

const swappingCurrencies = () => {
    const temp = usaText.textContent;
    usaText.textContent = pakText.textContent;
    pakText.textContent = temp;

    const temp1 = flagImg.src;
    flagImg.src = flagImg1.src;
    flagImg1.src = temp1;
};
exchangeCurrencies.addEventListener('click', () => {
    exchangeRateInfo();
    swappingCurrencies();
});

currencySelectionContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenuAppear();
});
currencySelectionContainer1.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenuAppear1();
});

currencySelectionContainer.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenuAppear();
});
currencySelectionContainer1.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenuAppear1();
});

document.addEventListener('click', () => {
    dropdownMenu.style.display = 'none'; // Hide dropdown if clicked outside
});
document.addEventListener('click', () => {
    dropdownMenu1.style.display = 'none'; // Hide dropdown if clicked outside
});

