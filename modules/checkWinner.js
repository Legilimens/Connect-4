const checkWinner = (field) => {
	if (checkHorizont(field) || checkVertical(field) || checkDiagonalRight(field) || checkDiagonalLeft(field))
		return true;
	else return false;
};

const checkHorizont = (field) => {
	// начинаем идти по всем строкам массива
	for (let r = 0; r <= 6; r++) {
		// заходим в каждую строку и проверяем, перебираясь по столбцу вверх
		for (let c = 0; c <= 2; c++) {
			if (field[r][c]) {
				if (field[r][c] === field[r][c + 1] &&
					field[r][c] === field[r][c + 2] &&
					field[r][c] === field[r][c + 3]) {
					return true;
				}
			}
		}
	}
}

const checkVertical = (field) => {
	// начинаем идти от третей строки массива, так как если начать с более нижней - раньше времени упремся в подвал
	for (let r = 3; r <= 6; r++) {
		// в каждой стпроке проверяем элемент опускаясь на строчку вниз
		for (let c = 0; c <= 6; c++) {
			if (field[r][c]) {
				if (field[r][c] === field[r - 1][c] &&
					field[r][c] === field[r - 2][c] &&
					field[r][c] === field[r - 3][c]) {
					return true;
				}
			}
		}
	}
}

const checkDiagonalRight = (field) => {
	// начинаем идти от третей строки массива, так как мы ищем последовательность из четырех. Иначе раньше времени упремся в небытие
	for (let r = 3; r <= 6; r++) {
		for (let c = 0; c <= 3; c++) {
			if (field[r][c]) {
				if (field[r][c] === field[r - 1][c + 1] &&
					field[r][c] === field[r - 2][c + 2] &&
					field[r][c] === field[r - 3][c + 3]) {
					return true;
				}
			}
		}
	}
}

const checkDiagonalLeft = (field) => {
	for (let r = 3; r <= 6; r++) {
		for (let c = 3; c <= 6; c++) {
			if (field[r][c]) {
				if (field[r][c] === field[r - 1][c - 1] &&
					field[r][c] === field[r - 2][c - 2] &&
					field[r][c] === field[r - 3][c - 3]) {
					return true;
				}
			}
		}
	}
}

module.exports = {
	checkWinner
}