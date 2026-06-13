class RecentChats extends HTMLElement {
    connectedCallback() {
        this.render();
        this.attachEvents();
    }

    render() {
        this.innerHTML = `
            <div class="recentChats">

                <!-- Top AI contact and signal icon -->
                <div class="ai-contacts">
                    <h3>AI contacts</h3>
                    <div>
                        <img src="./images/second-signal.png" alt="Signal">
                    </div>
                </div>

                <!-- Search Bar -->
                <div class="search-bar">
                    <div>
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="Ask AI or Search..."
                        >
                    </div>
                </div>

                <!-- Existing recentchats Sidebar Component -->
                <chat-sidebar
                    class="recentChat-contacts js-recentChat-contacts">
                </chat-sidebar>

            </div>
        `;
    }

    attachEvents() {
        const searchInput = this.querySelector("#searchInput");

        if (!searchInput) return;

        searchInput.addEventListener("input", (e) => {
            const searchValue = e.target.value.trim();

            // Send search event to parent/app
            this.dispatchEvent(
                new CustomEvent("chat-search", {
                    //data sent with even
                    detail: searchValue,

                    //allow event to move upword through dom tree
                    bubbles: true,

                    //allow event to cross shodow dom boundries
                    composed: true
                })
            );
        });
    }
}

customElements.define("recent-chats", RecentChats);