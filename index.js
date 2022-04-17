
const fillTable = () => {
    // Fetches the data from localStorage and parses it to be used in code
    if (localStorage.getItem('infoDetails') !== null) {
        const contacts = JSON.parse(localStorage.infoDetails);
        const tableBody = document.querySelector('tbody');
        tableBody.innerHTML = '';
        console.log("Contacts: ", contacts)
        contacts.forEach(contact => {
            tableBody.innerHTML += `
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.mobile}</td>
        `
        })
    }
}

const isValidEmail = (email) => {
    const regex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})*$/;
    return regex.test(email);
}
const isValidPhone = (contact) => {
    const regex = /[2-9]{2}\d{8}/;
    return regex.test(contact);
}


let form = document.querySelector('form');
// console.log(form);
let fullName = document.querySelector('input[id="name"]');
// let lastName = document.querySelector('input[id="lname"]');
let email = document.querySelector('input[id="emailId"]');
let contact = document.querySelector('input[id="contact"]');

const resetError = (ele) => {
    ele.classList.remove('invalid');
    ele.nextElementSibling.classList.add('hidden');
}

const setError = (ele) => {
    ele.classList.add('invalid');
    ele.nextElementSibling.classList.remove('hidden');
}

const validateEmail = () => {
    resetError(email);
    if (!isValidEmail(email.value)) {
        setError(email);
    }
}
//Returns true if name is of valid else false
const validateName = (name) => {
    let regexName = /^[a-zA-Z ]*$/;
    return regexName.test(name);
}

const validateContact = () => {
   resetError(contact);
    if (!isValidPhone(contact.value)) {
        setError(contact);
    }
}

email.addEventListener('input', () => {
    validateEmail();
})

contact.addEventListener('input', () => {
    validateContact();
})


function demo(e) {
    e.preventDefault();
    console.log('called');
}

const submitForm = (e) => {
    
    e.preventDefault();
    if(!validateName(fullName.value) || !isValidPhone(contact.value)){
        alert('error in form')
        return
        
    }
    let data = [];
    // If data already exists in localStorage then pushed it in data array
    if (localStorage.getItem('infoDetails') !== null) {
        let oldDatas = JSON.parse(localStorage.infoDetails);
        oldDatas.forEach(oldData => data.push(oldData));
    }
    let newData = {
        name: fullName.value,
        email: email.value,
        mobile: contact.value
    };
    // Pushes newData contact in data array
    data.push(newData);
    // Saves data array in localStorage contact stringifying it
    localStorage.setItem('infoDetails', JSON.stringify(data));
    form.reset();
    fillTable();
}

fillTable();

form.addEventListener('submit', submitForm);
