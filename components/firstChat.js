class firstChat extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({mode : "open"});


    }

    connectedCallback(){
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

        <div class="chatOne" data-id="1">
            <div class="image-div dot">
                <img src="./images/picThree.jpg" alt="Riya Jain">
            </div>

            <div class="chat-data">
                <div class="top-row">
                    <p class="name">Riya Jain</p>
                    <p class="time">04:06 PM</p>
                </div>

                <div class="bottom-row">
                    <p class="message unread">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    </p>
                </div>
            </div>
        </div>
        <hr class="divider" />
        `

    }
}

customElements.define("first-chat", firstChat);