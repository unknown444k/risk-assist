// document.getElementById("login-form").addEventListener("submit", login);

// async function login(event) {
//   event.preventDefault();

//   const useremail = document.getElementById("email").value;
//   const userpassword = document.getElementById("password").value;

//   if (useremail === "" && userpassword === "") {
//     alert("Please enter username and password");
//   } else if (useremail !== "" && userpassword === "") {
//     alert("Please enter password");
//   } else if (useremail !== useremail.toLowerCase()) {
//     alert("Email should not contain uppercase letters");
//   } else {
//     try {
//       const response = await fetch(
//         "http://localhost:5500/api/v1/tasks/login",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ useremail, userpassword }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }

//       const data = await response.json();
//       console.log("Login successful:", data);

//       // Redirect to another page or perform other actions upon successful login
//       // For example, you can redirect the user to a dashboard page:
//       // window.location.href = '/dashboard';

//       alert("Login successful");
//       window.location.href = 'task.html';

//     } catch (error) {
//       console.error("Login failed:", error.message);
//       // Handle login error, show error message, etc.
//       alert("Login failed. Please check your credentials.");
//     }
//   }
// }