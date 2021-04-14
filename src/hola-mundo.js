import { LitElement, html, css } from "lit-element";

class BreweryApp extends LitElement {

  static get styles() {
    return css`
      .main__box {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        align-items: center;
      }
      .main__box_header{
        width: 100%;
        height: 80px;
        text-align: center;
        background: #20639B;
        color: white;
        margin-bottom: 10px;
        line-height: 5px;
        font-family: Arial, Helvetica, sans-serif;
      }
      .main__box_subtitle {
        display: flex;
        justify-content: center;
        margin: -19px;
      }
      .main__box_card {
        width: 250px;
        height: 200px;
        /* border: 1px solid #20639B; */
        box-shadow: 1px 0 5px 1px #2b3e4d;
        margin: 5px;
        padding: 10px;
        border-radius: 10px;
      }
      a {
        text-decoration: none;
      }
    `;
  }


  static get properties() {
    return {
      breweries: { type: Array },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    !this.breweries && this.fetchBreweries();
  }

  async fetchBreweries() {
    const response = await fetch("https://api.openbrewerydb.org/breweries");
    const jsonResponse = await response.json();
    this.breweries = jsonResponse;
  }
  render() {
    return html`
    <section class="main__box">
    <header class="main__box_header">
      <h2>Breweries API</h2>
      <div class="main__box_subtitle">
        <span><img src="https://img.icons8.com/ios-filled/30/DADCE0/beer.png"/></span>
        <p>https://api.openbrewerydb.org/breweries</p>
        <img src="https://img.icons8.com/ios-filled/30/DADCE0/filled-like.png"/>
      </div>
    </header>
      ${ this.breweries && this.breweries.map((brewerie) => html`
      <article class="main__box_card">
        <header>
          <h3>${brewerie.name}</h3>
        </header>
        <address>
          <strong>street: </strong>${brewerie.street}<br>
          <strong>city: </strong>${brewerie.city}<br>
          <strong>state: </strong>${brewerie.state}<br>
          <strong>country: </strong>${brewerie.country}<br>
          <strong>phone: </strong>${brewerie.phone}<br>
          <strong>url:</strong><a href="${brewerie.website_url}"> Link</a><br>
        </address>
      </article>
      `)}
    </section>
    `;
  }
}

customElements.define("brewery-app", BreweryApp);
