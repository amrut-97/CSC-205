
const stud_form = document.getElementById('stud_form');
const f_name = document.getElementById('f_name');
const l_name = document.getElementById('l_name');
const email = document.getElementById('email');
const cont_no = document.getElementById('cont_no');
const roll_no = document.getElementById('roll_no');
const username = document.getElementById('username');
const pass = document.getElementById('pass');
const re_pass = document.getElementById('re_pass');

const namePattern = /^[a-z]{2,25}$/i;
const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
const cont_no_Pattern = /^[0-9]{10,10}$/;
const roll_no_Pattern = /^[0-9]{4,4}$/;
const usernamePattern = /^[a-zA-Z0-9]{2,25}$/
const passPattern = /^.{8,16}$/;


var input = document.getElementById('f_name');  
input.select();

// Submit button functions

stud_form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(validateStudForm()) 
        addFormDataToTable();
});


function validateStudForm(){
    let isFormvalidated = false;
    let isFNameValidated = false;
    let isLNameValidated = false;
    let isEmailValidated = false;
    let isContNoValidated = false;
    let isRollNoValidated = false;
    let isUsernameValidated = false;
    let isPassValidated = false;
    let isRePassValidated = false;

    if(f_name.value == ''){
        setError(f_name, 'First name cannot be empty');
    }else if(f_name.value.match(namePattern) == null){
        setError(f_name, 'First name can only have letters');
    }else{
        removeError(f_name);
        isFNameValidated = true;
    }   
    

    if(l_name.value == ''){
        setError(l_name, 'Last name cannot be empty');
    }else if(l_name.value.match(namePattern) == null){
        setError(l_name, 'Last name can only have letters');
    }else{
        removeError(l_name);
        isLNameValidated = true;
    } 
    
    if(email.value == ''){
        setError(email, 'Email cannot be empty');
    }else if(email.value.match(emailPattern) == null){
        setError(email, 'Invalid email');
    }else{
        removeError(email);
        isEmailValidated = true;
    } 
    
    if(cont_no.value == ''){
        setError(cont_no, 'Contact number cannot be empty');
    }else if(cont_no.value.match(cont_no_Pattern) == null){
        setError(cont_no, 'Invalid contact number');
    }else{
        removeError(cont_no);
        isContNoValidated = true;
    }
    
    if(roll_no.value == ''){
        setError(roll_no, 'Roll number cannot be empty');
    }else if(roll_no.value.match(roll_no_Pattern) == null){
        setError(roll_no, 'Invalid Roll number');
    }else if(checkIfRollNoExistsInTable()){
        setError(roll_no, 'Roll number already used');
    }else{
        removeError(roll_no);
        isRollNoValidated = true;
    }
    
    if(username.value == ''){
        setError(username, 'Username cannot be empty');
    }else if(usernamePattern.test(username.value) == null){
        setError(username, 'Invalid Username');
    }else{
        removeError(username);
        isUsernameValidated = true;
    } 

    escapeQuotes(pass.value);
    escapeQuotes(re_pass.value);

    if(pass.value == ''){
        setError(pass, 'Password cannot be empty');
    }else if(pass.value.match(passPattern) == null){
        setError(pass, 'Password needs have 8 min and 16 max characters');
    }else{
        removeError(pass);
        isPassValidated = true;
    } 
    
    if(re_pass.value == ''){
        setError(re_pass, 'Confirm Password cannot be empty');
    }else if(pass.value.match(re_pass.value) == null){
        setError(re_pass, 'Please enter the same password again');
    }else if(re_pass.value.match(pass.value) == null){
        setError(re_pass, 'Please enter the same password again');
    }else{
        removeError(re_pass);
        isRePassValidated = true;
    } 
    
    if( isFNameValidated & isLNameValidated & isEmailValidated & isContNoValidated 
        & isRollNoValidated & isUsernameValidated & isPassValidated & isRePassValidated)
        isFormvalidated = true;
    
    return isFormvalidated;
};

function checkIfRollNoExistsInTable(){
    if((table.children.length == 1)){
        console.log("only 1 child");
        return false;
    }
        
    rows = table.children;

    for(let i = 1; i < table.children.length; i++){
        if(rows[i].firstChild.innerText == roll_no.value){
            return true;
        }else{
            continue;
        }
    }
}

function escapeQuotes(str){
    for(let i = 0; i < str.length; i++){
        if(str[i] == '\'' || str[i] == '\"') 
            str[i].concat('\\');
    }
}

function setError(element, errorMessage){
    const parent = element.parentElement;
    parent.classList.add('error');
    const error_text = parent.querySelector('span');
    error_text.textContent = errorMessage;
}

function removeError(element){
    const parent = element.parentElement;
    parent.classList.remove('error');
    const error_text = parent.querySelector('span');
    error_text.textContent = '';
}


// Reset button functions

stud_form.addEventListener('reset', (event) => {
    event.preventDefault();

    resetFormData();
});

function resetFormData(){
    f_name.value = '';
    l_name.value = '';
    email.value = '';
    cont_no.value = '';
    roll_no.value = ''; 
    username.value = ''; 
    pass.value = ''; 
    re_pass.value = '';

    removeError(f_name);
    removeError(l_name);
    removeError(email);
    removeError(cont_no);
    removeError(roll_no);
    removeError(username);
    removeError(pass);
    removeError(re_pass);
}

// table data manipulation
let table = document.getElementById("reg_list_tb");


function addFormDataToTable(){

    let row = document.createElement("tr");

    row.classList.add('tb_data');

    let tb_data_name = document.createElement('td');
    tb_data_name.innerHTML = f_name.value + " " + l_name.value;

    let tb_data_email = document.createElement('td');
    tb_data_email.innerHTML = email.value;

    let tb_data_cont_no = document.createElement('td');
    tb_data_cont_no.innerHTML = cont_no.value;

    let tb_data_roll_no = document.createElement('td');
    tb_data_roll_no.innerHTML = roll_no.value;

    let tb_data_username = document.createElement('td');
    tb_data_username.innerHTML = username.value;

    row.appendChild(tb_data_roll_no);
    row.appendChild(tb_data_name);
    row.appendChild(tb_data_username);
    row.appendChild(tb_data_email);
    row.appendChild(tb_data_cont_no);

    table.appendChild(row);
}
