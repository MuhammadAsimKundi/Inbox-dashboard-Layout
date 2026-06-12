class Credits extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });


  }    

  connectedCallback(){
    const amount = this.getAttribute("amount") || '0';
    const start = this.getAttribute('start') || '';
    const end = this.getAttribute('end') || new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./css/style.css">

      <div class="credits">
        <p>Credits</p>

        <div>
          <span>¢</span>
          <p>${amount}</p>
        </div>

        <p>
          <i class="fa-solid fa-calendar-days"></i>
          ${start} - ${end}
        </p>
      </div>
    `;
  }


}

customElements.define("app-credits", Credits);