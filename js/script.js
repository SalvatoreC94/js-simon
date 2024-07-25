function startGame() {
    const minimum = 1;
    const maximum = 10;
    const randomNumbers = [];
    const numbersContainer = document.getElementById('numbers-container');
    const timerContainer = document.getElementById('timer');
    const timeToWait = 30; // Tempo di visualizzazione in secondi

    // Pulizia del contenitore
    numbersContainer.innerHTML = '';

    // Generazione e visualizzazione dei numeri casuali
    for (let i = 0; i < 5; i++) {
        const num = getRandomNumber(minimum, maximum);
        console.log('num', num, typeof num);

        randomNumbers.push(num);
        numbersContainer.innerHTML += `<span>${num}</span>`;
    }

    console.log('randomNumbers', randomNumbers, typeof randomNumbers);

    // Inizializzazione del timer
    let timeLeft = timeToWait;
    timerContainer.textContent = timeLeft;

    const timerInterval = setInterval(function () {
        timeLeft--;
        timerContainer.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            numbersContainer.innerHTML = '';
            console.log('Numeri nascosti. Richiesta input utente.');

            // Richiedere i numeri all'utente
            setTimeout(function () {
                const guessedNumbersList = [];
                for (let i = 0; i < 5; i++) {
                    const userNumber = parseInt(prompt(`Inserisci il ${i + 1}° numero:`), 10);
                    guessedNumbersList.push(userNumber);
                }

                console.log('Numeri inseriti dall\'utente:', guessedNumbersList);

                // Verifica dei numeri e conteggio dei numeri indovinati
                let correctCount = 0;
                const correctNumbers = [];
                for (const num of guessedNumbersList) {
                    if (randomNumbers.includes(num) && !correctNumbers.includes(num)) {
                        correctCount++;
                        correctNumbers.push(num);
                    }
                }

                console.log('Numeri corretti:', correctNumbers);

                // Mostrare i risultati all'utente
                alert(`Hai indovinato ${correctCount} numeri corretti: ${correctNumbers.join(", ")}`);
            }, 500);
        }
    }, 1000);
}

// Funzione per ottenere un numero casuale tra min e max
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
