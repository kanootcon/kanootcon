let players = []; // This will store player details and scores
let history = []; // This will store arrays of match results

function updateResults(roundResults) {
    // Check each match for valid scores and victory points
    for (const match of roundResults) {
        const { score1, score2, vp1, vp2 } = match;

        // Score must be between 0 and 20 and sum to 20
        if (score1 < 0 || score1 > 20 || score2 < 0 || score2 > 20) {
            console.error("Error: Scores must be between 0 and 20.");
            return; // Stop processing if there's an invalid score
        }
        if (score1 + score2 !== 20) {
            console.error("Error: The sum of scores for both players must be 20.");
            return; // Stop processing if the scores don't sum up to 20
        }

        // Victory points must be higher for the player with the higher score
        if ((score1 > score2 && vp1 <= vp2) || (score2 > score1 && vp2 <= vp1)) {
            console.error("Error: The player with the higher score must have more victory points.");
            return; // Stop processing if victory points do not correlate with scores
        }
    }

    // Proceed if all checks pass
    history.push(roundResults);
    roundResults.forEach(match => {
        updatePlayerScores(match.player1, match.score1, match.vp1, match.score1 > match.score2);
        updatePlayerScores(match.player2, match.score2, match.vp2, match.score2 > match.score1);
    });
    displayResults();
    displayLeaderboard();
}



function updatePlayerScores(player, score, victoryPoints, won) {
    let playerRecord = players.find(p => p.name === player);
    if (!playerRecord) {
        playerRecord = { name: player, score: 0, victoryPoints: 0, won: 0, lost: 0 };
        players.push(playerRecord);
    }
    playerRecord.score += score;
    playerRecord.victoryPoints += victoryPoints;
    if (won) {
        playerRecord.won++;
    } else {
        playerRecord.lost++;
    }
}

// Display all match results
function displayResults() {
    const resultsDiv = document.getElementById('resultsTable');
    resultsDiv.innerHTML = ''; // Clear existing results

    history.forEach((round, index) => {
        // Create and append the round heading
        const roundHeading = document.createElement('h3');
        roundHeading.textContent = `Round ${index + 1}`;
        resultsDiv.appendChild(roundHeading);

        // Create the results table for this round
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = '<tr><th>Player 1</th><th>Score</th><th>VP</th><th>Player 2</th><th>Score</th><th>VP</th></tr>';
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        round.forEach(match => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${match.player1}</td><td>${match.score1}</td><td>${match.vp1}</td><td>${match.player2}</td><td>${match.score2}</td><td>${match.vp2}</td>`;
            // Add color highlighting based on the match result
            if (match.score1 > match.score2) {
                row.cells[0].classList.add('winner');
                row.cells[3].classList.add('loser');
            } else if (match.score1 < match.score2) {
                row.cells[0].classList.add('loser');
                row.cells[3].classList.add('winner');
            } else {
                row.cells[0].classList.add('draw');
                row.cells[3].classList.add('draw');
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);
        resultsDiv.appendChild(table);
    });
}



// Display the leaderboard
function displayLeaderboard() {
    const leaderboardDiv = document.getElementById('leaderboard');
    leaderboardDiv.innerHTML = ''; // Clear existing content

    const table = document.createElement('table');
    const thead = document.createElement('thead');
    thead.innerHTML = '<tr><th>Player</th><th>Score</th><th>Victory Points</th></tr>';
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    players.sort((a, b) => b.score - a.score || b.victoryPoints - a.victoryPoints); // Sort by Score, then VP
    players.forEach((player, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${player.name}</td><td>${player.score}</td><td>${player.victoryPoints}</td>`;
        if (index === 0) { row.classList.add('first'); }
        else if (index === 1) { row.classList.add('second'); }
        else if (index === 2) { row.classList.add('third'); }
        tbody.appendChild(row);
    });
    table.appendChild(tbody);
    leaderboardDiv.appendChild(table);
}


// First round

updateResults([
     { player1: 'Mattias B', score1: 7, vp1: 200, player2: 'Cyp', score2: 13, vp2: 600 },
	 { player1: 'Grendal', score1: 9, vp1: 530, player2: 'Erik', score2: 11, vp2: 761 },
	 { player1: 'Snoken', score1: 17, vp1: 1022, player2: 'Svensken', score2: 3, vp2: 126 },
	 { player1: 'El Presidente', score1: 13, vp1: 680, player2: 'Stian', score2: 7, vp2: 292 },
     { player1: 'Simpa', score1: 10, vp1: 564, player2: 'Morten', score2: 10, vp2: 611 }
]);

// Second round
/*
updateResults([
     { player1: 'El Presidente', score1: 8, vp1: 200, player2: 'Erik', score2: 12, vp2: 350 },
	 { player1: 'Snoken', score1: 15, vp1: 722, player2: 'Cyp', score2: 5, vp2: 0 },
	 { player1: 'Grendal', score1: 3, vp1: 0, player2: 'Morten', score2: 17, vp2: 881 },
	 { player1: 'Mattias B', score1: 8, vp1: 103, player2: 'Svensken', score2: 12, vp2: 433 },
     { player1: 'Simpa', score1: 12, vp1: 718, player2: 'Stian', score2: 8, vp2: 366 }
]);
*/

// Third round
/*
updateResults([
     { player1: 'El Presidente', score1: 8, vp1: 200, player2: 'Morten', score2: 12, vp2: 350 },
	 { player1: 'Snoken', score1: 8, vp1: 200, player2: 'Simpa', score2: 12, vp2: 350 },
	 { player1: 'Grendal', score1: 8, vp1: 200, player2: 'Erik', score2: 12, vp2: 350 },
	 { player1: 'Robin', score1: 6, vp1: 200, player2: 'Svensken', score2: 14, vp2: 350 },
     { player1: 'Cyp', score1: 10, vp1: 200, player2: 'Stian', score2: 10, vp2: 220 }
]);
*/

/* Players
El Presidente
Morten
Cyp
Stian
Snoken
Simpa
Grendal
Svensken
Erik
Robin
*/
