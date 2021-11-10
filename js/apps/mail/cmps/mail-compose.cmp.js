export default {
  name: 'mail-compose',
  template: `
      <section class="mail-compose">
          <form class="compose-form">
            <input type="mail" placeholder="Recipient" required/>
            <input type="text" placeholder="Subject" />
            <textarea type="text" />
            <button>Send</button>
        </form>
    </section>
  `,
}
