export function openChats(selectedUserId){

    //stop function if no id is passed
    if(!selectedUserId){
        console.error('No user id received');
        return;
    }

    //checking received id
    console.log('Clicked User ID:', selectedUserId);

    //fetching opened chat data json
    fetch('./JSON/openChats.json')

    .then(res => res.json())
    .then(data => {

        //finding clicked user using passed id
        const selectedUser = data.chatData.find(user =>
            Number(user.id) === Number(selectedUserId)
        );

        //stop if user not found
        if(!selectedUser){
            console.error('User not found');
            return;
        }

        console.log('Selected User:', selectedUser);

        //getting common chats array
        const commonChats = data.commonChats;

        //variable for storing generated chats html
        let messagesHTML = '';

        //looping through every chat message
        commonChats.forEach(chat => {

            //sent message
            if(chat.type === 'send'){

                messagesHTML += `
                    <div class="send">

                        <div>
                            <p>${chat.message}</p>
                        </div>

                        <div class="chat-image">
                            <img 
                                src="${selectedUser.assignee.image}" 
                            >
                        </div>

                    </div>
                `;
            }

            // received message
            else if(chat.type === 'received'){

                messagesHTML += `
                    <div class="recieved">

                        <div class="chat-image">
                            <img 
                                src="${selectedUser.contact.image}" 
                            >
                        </div>

                        <div>
                            <p>${chat.message}</p>
                        </div>

                    </div>
                `;
            }

            // assignment message
            else if(chat.type === 'assignment'){

                messagesHTML += `
                    <div class="assign">

                        <hr>

                        <p>
                            <span>You</span>

                            assigned this conversation to

                            <span>${selectedUser.assignee.name}</span>
                        </p>

                    </div>
                `;
            }

        });

        // selecting open chat container
        const openChatContainer = document.querySelector('.js-openChat');

        // checking if container exists
        if(!openChatContainer){
            console.error('.js-openChat container not found');
            return;
        }

        // rendering final opened chat UI
        openChatContainer.innerHTML = `

            <!-- top info section -->
            <div class="main-info">

                <!-- contact info -->
                <div class="contact-info">

                    <div class="chat-image-div">
                        <img 
                            src="${selectedUser.contact.image}" 
                            alt="${selectedUser.contact.name}"
                        >
                    </div>

                    <div class="second-child">

                        <p>${selectedUser.contact.name}</p>

                        <p style="font-size: 0.8rem;">
                            ${selectedUser.contact.phone}
                        </p>

                    </div>

                </div>

                <!-- assignee info -->
                <div class="assingnee-info">

                    <div class="chat-image-div">
                        <img 
                            src="${selectedUser.assignee.image}" 
                            alt="${selectedUser.assignee.name}"
                        >
                    </div>

                    <div class="second-child">

                        <p style="font-size: 0.8rem; color: grey;">
                            ${selectedUser.assignee.role}
                        </p>

                        <div class="name-icon">

                            <p>${selectedUser.assignee.name}</p>

                            <i class="fa fa-caret-down"></i>

                        </div>

                    </div>

                </div>

            </div>

            <hr style="border: 1.5px solid #efefef;">

            <!-- all messages -->
            <div class="opened-Chat">
                ${messagesHTML}
            </div>

            <!-- message input -->
            <div class="message-input">

                <hr>

                <div class="input-wrapper">

                    <input type="text" placeholder="Type here....">

                    <img 
                        src="./images/sendIcon.png" 
                        alt="send icon"
                    >

                </div>

            </div>
        `;

        console.log('Chat Rendered Successfully');

    })

    // catching fetch/json errors
    .catch(error => {
        console.error("Error loading chats:", error);
    });

}