class StaticPagesController < ApplicationController
	def home
	end

	def gameField
		@userFirstNum = rand(1..13)
		@userSecondNum = rand(1..13)
		@userTotal = noMoreTen(@userFirstNum) + noMoreTen(@userSecondNum)
		if hasAce(@userFirstNum) && hasAce(@userSecondNum)
			@userWithAce = 11
		elsif hasAce(@userFirstNum) || hasAce(@userSecondNum)
			@userWithAce = @userTotal + 10
		else
			@userWithAce = @userTotal
		end

		@dealerFirstNum = rand(1..13)
		@dealerTotal = noMoreTen(@dealerFirstNum)
		@dealerWithAce = hasAce(@dealerTotal)? @dealerTotal + 10 : @dealerTotal
	end
	
	def noMoreTen(num)
		return (num > 10) ? 10 : num
	end

	def hasAce(num)
		return num == 1
	end
end
