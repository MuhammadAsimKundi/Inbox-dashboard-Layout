// import { openChats } from "./openChat.js";

// //fetching recent chats json
// fetch('./JSON/recentChats.json')

// // converting response into json
// .then(response => response.json())

// //getting recent chats array
// .then(recentChats => {
//     console.log('Recent Chats:', recentChats);

//     //left sidebar container
//     const chats = document.querySelector('.js-recentChat-contacts');

//     //checking if container exists
//     if(!chats ){
//         console.error('.js-recentChat-contacts not found');
//         return;
//     }

//     // variable for storing sidebar html
//     let chatsHTML = '';

//     // looping through every user
//     recentChats.forEach(user => {

//         chatsHTML += `
//             <div class="chatOne" data-id="${user.id}">
//                 <div class="image-div ${user.hasDot ? 'dot' : ''}">
//                     <img src="${user.image}" alt="${user.name}">
//                 </div>

//                 <div class="chat-Data">
//                     <div class="name-time">
//                         <p>${user.name}</p>
//                         <p>${user.time}</p>
//                     </div>

//                     <div class="check-message">
//                         ${user.checkIcon ? `<img src="${user.checkIcon}" style="font-size:0.5rem;">` : ""}
//                         <p class="message ${user.hasDot ? 'black-message' : ''}">
//                             ${user.message}
//                         </p>
//                     </div>
//                 </div>
//             </div>
//             <hr class="contacts-hr">
//         `;

//     });

//     //rendering all sidebar chats once
//     chats.innerHTML = chatsHTML;

//     //render first user chat automatically
//     if(recentChats.length > 0){

//         openChats(recentChats[0].id);
//     }

//     //sitting big smurf on 
//     chats.addEventListener('click', (e) => {

//         //getting clicked user
//         const clickedChat = e.target.closest('.chatOne');

//         //stop if clicked outside
//         if(!clickedChat) return;

//         //getting clicked user id
//         const selectedUserId = clickedChat.dataset.id;

//         console.log('Clicked User ID:', selectedUserId);

//         openChats(selectedUserId);

//     });


//     //serchbar
//     const searchInput = document.getElementById("searchInput");

//     searchInput.addEventListener("input", (e) => {
//         const text = e.target.value.toLowerCase().trim();

//         //.filter() returns new filtered array
//         const filteredChats = recentChats.filter(user => {
//             return user.name.toLowerCase().startsWith(text);
//         });

//         let chatsHTML = '';

//         //generating html for matched users in new filtered array
//         filteredChats.forEach(user => {

//             chatsHTML += `
//                 <div class="chatOne" data-id="${user.id}">
//                     <div class="image-div ${user.hasDot ? 'dot' : ''}">
//                         <img src="${user.image}" alt="${user.name}">
//                     </div>

//                     <div class="chat-Data">
//                         <div class="name-time">
//                             <p>${user.name}</p>
//                             <p>${user.time}</p>
//                         </div>

//                         <div class="check-message">
//                             ${user.checkIcon ? `<img src="${user.checkIcon}" style="font-size:0.5rem;">` : ""}
//                             <p class="message ${user.hasDot ? 'black-message' : ''}">
//                                 ${user.message}
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//                 <hr class="contacts-hr">
//             `;
//         });

//         //re-redering the html in dom
//         chats.innerHTML = chatsHTML;
//     });

// })

// // catching fetch errors
// .catch(err => {
//     console.log('Error loading json:', err);
// });

import "./components/RecentChats.js";
import "./components/ChatSidebar.js";

const chatSidebar = document.querySelector("chat-sidebar");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", (e) => {
  chatSidebar.setSearch(e.target.value);
});

document.addEventListener("chat-search", (e) => {
    console.log("Searching:", e.detail);
});