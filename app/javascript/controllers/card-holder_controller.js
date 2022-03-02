import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
		this.element.animate([{opacity: '0'}, {opacity: '1'}], 1000)
  }
}
