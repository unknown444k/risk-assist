// document.querySelector('form[name="signup"]').addEventListener('submit', signUpHandler);

// async function signUpHandler(event) {
//   event.preventDefault();

//   const name = document.getElementById('fullname').value;
//   const email = document.getElementById('email').value;
//   const phone = document.getElementById('phone').value;
//   const userpassword = document.getElementById('password').value;
//   const confpassword = document.getElementById('confpassword').value;

//   var emailPattern = /^(?!.*[A-Z])[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//   var passpattern =
//     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   var hasMinLength = userpassword.length >= 8;
//   var hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(userpassword);
//   var hasUpperCase = /[A-Z]+/.test(userpassword);
//   var hasLowerCase = /[a-z]+/.test(userpassword);
//   if (
//     name == "" ||
//     email == "" ||
//     phone == "" ||
//     userpassword == "" ||
//     confpassword == ""
//   ) {
//     alert("All the fields are mandatory");
//   }  else if (!emailPattern.test(email)) {
//     alert("please enter valid email");
//   } else if (!passpattern.test(userpassword)) {
//     alert("please enter valid password");
//   }  else if (
//     !hasMinLength ||
//     !hasLowerCase ||
//     !hasSpecialChar ||
//     !hasUpperCase
//   ) {
//     alert(
//       "Password should contain a minimum of 8 characters, at least 1 special character, 1 uppercase letter, and 1 lowercase letter."
//     );
//   } else if (isNaN(phone)) {
//     alert("please enter valid phone");
//   } else if (phone.length !== 10) {
//     alert("phone number should contain 10 digits");
//   } 
//  else if (userpassword !== confpassword) {
//     alert('Passwords do not match');
//     return;
//   }
//   else{
// const userData = {
//     name,
//     email,
//     phone,
//     userpassword,
//     confpassword
//   };

//   try {
//     const response = await fetch('http://localhost:5500/api/v1/tasks/signup', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const data = await response.json();
//     console.log('Signup successful:', data);

//     // Redirect to the login page after successful signup
//     window.location.href = 'login.html';

//     alert('Signup successful. Please login.');

//   } catch (error) {
//     console.error('Signup failed:', error.message);
//     // Handle signup error, show error message, etc.
//     alert('Signup failed. Please try again.');
//   }
//   }
// }
