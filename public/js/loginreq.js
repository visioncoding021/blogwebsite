const Signup = document.getElementById("sign-up-btn");
const Signin = document.getElementById("sign-in-btn");
const NewuserNAme = document.getElementById("new-user-name");
const NewuserEmail = document.getElementById("new-user-email");
const NewuserPassword = document.getElementById("new-user-password");
const Usermail = document.getElementById("user-email");
const Userpassword = document.getElementById("user-password");
const loginData = {
    username: 'your_username',
    password: 'your_password',
  };
Signin.addEventListener('click',()=>{
   console.log(Usermail.value);
   console.log(Userpassword.value)
if(Usermail.value == "" || Usermail == ""){
    alert("must not be empty");
}else{
  loginData.username = Usermail.value;
  loginData.password = Userpassword.value;

}

})


  
  fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      

    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Login successful:', data);
      // redirect the side to home page with login info;
      if (data.success) {
        
        window.location.href = 'http://localhost:3000/blog';
      } else {
      
        console.error('Login failed:', data.error);
      }
     
    })
    .catch(error => console.error('Error during login:', error));
  


    Signup.addEventListener('click',()=>{

      const accountData = {
          username:NewuserNAme.value,
          email: NewuserEmail.value,
          password: NewuserPassword.value,
        };
        
        fetch('http://localhost:3000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            
          },
          body: JSON.stringify(accountData),
        })
          .then(response => response.json())
          .then(data => {
            console.log('Account creation successful:', data);
          })
          .catch(error => console.error('Error during account creation:', error));
        
    })