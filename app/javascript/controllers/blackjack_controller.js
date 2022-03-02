import { Controller } from "@hotwired/stimulus"
import { noMoreTen, hasAce, checkOver21, whoIsWin, checkOver21ForHidden } from "./functions"

export default class extends Controller{
	connect(){
		const hitBtn = document.getElementById('hit')
		const standBtn = document.getElementById('stand')

		const playerField = document.getElementById('player-field')
		const playerHiddenField = document.getElementById('player-hidden')
		const playerTotal = document.getElementById('player-total')
		const playerTotalWithAce = document.getElementById('player-total-ace')

		const dealerField = document.getElementById('dealer-field')
		const dealerHiddenField = document.getElementById('dealer-hidden')
		const dealerTotal = document.getElementById('dealer-total')
		const dealerTotalWithAce = document.getElementById('dealer-total-ace')

		const resultField = document.getElementById('result')
		
		let willDealerDraw = true
		let counter = 0

		// check if first cards has Ace and if don't then hide alternative total
		if (dealerTotal.innerText == dealerTotalWithAce.innerText){
			dealerHiddenField.classList.add('hidden')
		}
		if (playerTotal.innerText == playerTotalWithAce.innerText){
			playerHiddenField.classList.add('hidden')
		}


		// function for hit button
		hitBtn.addEventListener('click', ()=>{
			let imgElement = document.createElement('img')
			let playCard = Math.floor(Math.random()*(14-1)+1)
			imgElement.setAttribute('src', `/assets/player_card-${playCard}.png`)
			playerField.querySelectorAll('.card-holder')[counter].classList.remove('hidden')
			playerField.querySelectorAll('.card-holder')[counter].classList.add('block')
			playerField.querySelectorAll('.card-holder')[counter].appendChild(imgElement)
			playCard = noMoreTen(playCard)
			let currentNum = parseInt(playerTotal.innerText) + playCard
			playerTotal.innerText = `${currentNum}`
			if (hasAce(playCard)){
				playerTotalWithAce.innerText = `${currentNum + 10}`
				playerHiddenField.classList.remove('hidden')
			}else{
				playerTotalWithAce.innerText = `${currentNum}`
			}
			checkOver21(currentNum, resultField, "You Lose")
			checkOver21ForHidden(playerTotalWithAce, playerHiddenField)
			counter += 1
		})

		standBtn.addEventListener('click', async () =>{
			counter = 1
			if (!playerHiddenField.classList.contains('hidden')){
				playerTotal.innerText = playerTotalWithAce.innerText
				playerHiddenField.classList.add('hidden')
			}
			while (willDealerDraw == true){
				let imgElement = document.createElement('img')
				let playCard = Math.floor(Math.random()*(14-1)+1)
				imgElement.setAttribute('src', `/assets/dealer_card-${playCard}.png`)
				dealerField.querySelector('.card-holder').classList.add('hidden')
				dealerField.querySelectorAll('.card-holder')[counter].classList.remove('hidden')
				dealerField.querySelectorAll('.card-holder')[counter].classList.add('block')
				dealerField.querySelectorAll('.card-holder')[counter].appendChild(imgElement)
				playCard = noMoreTen(playCard)
				let currentNum = parseInt(dealerTotal.innerText) + playCard
				dealerTotal.innerText = `${currentNum}`
				if (hasAce(playCard)){
					dealerTotalWithAce.innerText = `${currentNum + 10}`
					dealerHiddenField.classList.remove('hidden')
				}else{
					dealerTotalWithAce.innerText = `${currentNum}`
				}
				await new Promise( resolve => { setTimeout( resolve, 2000 ) } )
				checkOver21(currentNum, resultField, "You Win")
				checkOver21ForHidden(dealerTotalWithAce, dealerHiddenField)

				if (!dealerHiddenField.classList.contains('hidden')){
					if (parseInt(dealerTotalWithAce.innerText) > 16){
						currentNum = parseInt(dealerTotalWithAce.innerText)
						dealerTotal.innerText = dealerTotalWithAce.innerText
						dealerHiddenField.classList.add('hidden')
					}
				}

				if (currentNum > 16 && currentNum < 22){
					willDealerDraw = false
					whoIsWin(parseInt(playerTotal.innerText), parseInt(dealerTotal.innerText), resultField)
				}else if(currentNum > 21){
					willDealerDraw = false
				}
				counter += 1
			}
		})
	}
}
