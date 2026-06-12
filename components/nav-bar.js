class Navbar extends HTMLElement{
    constructor(){
        super();

        this.attachShadow({ mode: "open"});
    }
    connectedCallback(){
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./css/style.css">
            <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
            >
            <!-- navbar -->
            <nav class="nav">
                <ul class="nav-left"></ul>
                <ul class="nav-center">
                    <li>Dashboard</li>
                    <li>Marketing</li>
                    <li><i class="fa-solid fa-dollar-sign"></i>&nbsp;&nbsp;&nbsp;&nbsp; Sales</li>
                    <li>GMB</li>
                    <li>Automation</li>
                </ul>
                <ul class="nav-right">
                    <li><i class="fa-regular fa-bell"></i></li>
                    <li><i class="fa-brands fa-google"></i></li>
                </ul>
            </nav>
        `
    }
}

//registering element
customElements.define("nav-bar", Navbar);