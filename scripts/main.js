//fetching from recentChats.json file in JSON folder
fetch('./JSON/recentChats.json')

//response(status,link etc) will be save in the parameter called response inside .then
.then( ( response) =>  {

    //gives us the json data(async promise) attaced to the response
    return response.json()
})

//this gives us the recent chats array
.then(recentChats => {
    console.log(recentChats)
    //usig variable chats that is easy for later use and makes code easy
    let chats = document.querySelector('.js-recentChat-contacts')

    recentChats.forEach((user) => {
        if(user.hasDot === true){
            chats.innerHTML += `
                <div class="chatOne">
                    <div class="image-div dot">
                        <img src="${user.image}" alt="">
                    </div>
                    <div class="chat-Data">

                        <div class="name-time">
                            <p>${user.name}</p>
                            <p>${user.time}</p>
                        </div>

                        <div class="check-message">
                            <p class="message black-message">${user.message}</p>
                        </div>
                    </div>
                </div>
                <hr class="contacts-hr">
            `;
        }else if(user.checkIcon){
            chats.innerHTML += `
                <div class="chatOne">
                    <div class="image-div">
                        <img src="${user.image}" alt="">
                    </div>
                    <div class="chat-Data">
                        <div class="name-time">
                            <p>${user.name}</p>
                            <p>${user.time}</p>
                        </div>
                        <div class="check-message">
                            <img src="${user.checkIcon}" style="font-size: 0.5rem;">
                            <p class="message">${user.message}</p>
                        </div>
                    </div>
                </div>
            `;
        }else{
            chats.innerHTML += `
                <div class="chatOne">
                    <div class="image-div">
                        <img src="${user.image}" alt="">
                    </div>
                    <div class="chat-Data">
                        <div class="name-time">
                            <p>${user.name}</p>
                            <p>${user.time}</p>
                        </div>
                        <div class="check-message">
                            <p class="message">${user.message}</p>
                        </div>
                    </div>
                </div>
            `;
        };
    });

})
.catch(err => {
    console.log('Error loading json', err);
});