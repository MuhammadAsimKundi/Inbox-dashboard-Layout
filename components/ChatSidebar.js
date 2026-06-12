// import { openChats } from "../scripts/openChat.js";

class ChatSidebar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.state = {
      chats: [],
      filteredChats: []
    };

    this.handleChatClick = this.handleChatClick.bind(this);
    this.handleSearchExternal = this.handleSearchExternal.bind(this);
  }

  connectedCallback() {
    this.loadData();

    // listen to search from RecentChats component
    document.addEventListener("chat-search", this.handleSearchExternal);
  }
  
  disconnectedCallback() {
    document.removeEventListener("chat-search", this.handleSearchExternal);
  }

  //openchat()
  openChat(userId) {
    const chatPanel = document.querySelector('open-chats');

    if (chatPanel) {
      chatPanel.render(userId);
    } else {
      console.error('<open-chats> component not found');
    }
  }

  async loadData() {
    try {
      const res = await fetch("./JSON/recentChats.json");
      const data = await res.json();

      this.state.chats = data;
      this.state.filteredChats = data;

      this.render();
      this.attachEvents();

      // auto open first chat
      if (data.length > 0) {
        this.openChat(data[0].id);
      }
    } catch (err) {
      console.error("Error loading chats:", err);
    }
  }

  //external search logic
  handleSearchExternal(e) {
    const text = (e.detail || "").toLowerCase().trim();

    this.state.filteredChats = this.state.chats.filter(user =>
      user.name.toLowerCase().includes(text)
    );

    this.render();
    this.attachEvents();
  }

  //chat click logic
  handleChatClick(e) {
    const chat = e.target.closest(".chatOne");
    if (!chat) return;

    const selectedUserId = chat.dataset.id;

    this.openChat(selectedUserId);
  }

  //render ui
  render() {
    const chatsHTML = this.state.filteredChats.map(user => `
      <div class="chatOne" data-id="${user.id}">
        
        <div class="image-div ${user.hasDot ? "dot" : ""}">
          <img src="${user.image}" alt="${user.name}" />
        </div>

        <div class="chat-data">

          <div class="top-row">
            <p class="name">${user.name}</p>
            <p class="time">${user.time}</p>
          </div>

          <div class="bottom-row">
            ${user.checkIcon ? `<img class="check-icon" src="${user.checkIcon}" />` : ""}

            <p class="message ${user.hasDot ? "unread" : ""}">
              ${user.message}
            </p>
          </div>

        </div>

      </div>

      <hr class="divider" />
    `).join("");

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: 'Poppins', sans-serif
        }

        .list {
          width: 100%;
          height: 100%;
          overflow-y: auto;
          box-sizing: border-box;
        }

        .list::-webkit-scrollbar {
          display: none;
        }

        .chatOne {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 14px 20px;
          cursor: pointer;
        }

        .chatOne:hover {
          background: #f5f5f5;
        }

        .image-div {
          position: relative;
          width: 52px;
          height: 52px;
          flex-shrink: 0;
        }

        .image-div img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }

        .image-div.dot::after {
          content: "";
          position: absolute;
          width: 9px;
          height: 9px;
          background: #ff0000;
          border-radius: 50%;
          border: 4px solid #fff;
          right: -6px;
          top: 2px;
        }

        .chat-data {
          flex: 1;
          min-width: 0;
        }

        .top-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .name {
          font-size: 0.9rem;
          font-weight: 500;
          margin: 0;
        }

        .time {
          font-size: 0.7rem;
          color: grey;
          margin: 0;
        }

        .bottom-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .check-icon {
          width: 20px;
          height: 20px;
          flex-shrink: 0;
        }

        .message {
          font-size: 0.8rem;
          color: grey;
          margin: 0;
          padding-top: 4px;

          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;

          overflow: hidden;
          text-overflow: ellipsis;

          min-width: 0;
        }

        .unread {
          color: #000;
        }

        .divider {
          border: none;
          height: 1px;
          padding: 0px 20px;
          background: #eee;
          margin: 0;
        }
      </style>

      <div class="list js-recentChat-contacts">
        ${chatsHTML}
      </div>
    `;
  }

  //events
  attachEvents() {
    const container = this.shadowRoot.querySelector(".js-recentChat-contacts");

    container.removeEventListener("click", this.handleChatClick);
    container.addEventListener("click", this.handleChatClick);
  }
}

customElements.define("chat-sidebar", ChatSidebar);