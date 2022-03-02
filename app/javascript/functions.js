
let noMoreTen = (num) => {
	if (num > 10 ){
		return 10
	} else {
		return num
	}
}
let hasAce = (num) => {
	if (num == 1){
		return true
	}
}
let showResult = (field, result) => {
	field.classList.remove('hidden')
	field.classList.add('flex')
	field.querySelector('h2').innerText = `${result}`
}
let checkOver21 = (num, field, result) => {
	if( num > 21 ){
		showResult(field, result)
		console.log(num)
	}
}

let checkOver21ForHidden = (element, field) => {
	if (parseInt(element.innerText) > 21) {
		field.classList.add('hidden')
	}
}

let whoIsWin = (playerTotal, dealerTotal, field)=>{
	if(playerTotal == dealerTotal){
		showResult(field, "It's Tie.")
		console.log("tie")
	}else if (playerTotal > dealerTotal){
		showResult(field, "You win")
		console.log("win")
	}else{
		showResult(field, "You Lose")
		console.log("lose")
	}
}

export { noMoreTen, hasAce, checkOver21, whoIsWin, checkOver21ForHidden}