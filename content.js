function calculateTotalScore() {
    const competencies = document.querySelectorAll('[data-track-cr-competency-name]');
    let totalScore = 0;
    let totalWeight = 0;

    competencies.forEach(competency => {
        const weightText = competency.querySelector('.mat-expansion-panel-header-description').innerText;
        const weight = parseFloat(weightText.match(/(\d+)%/)[1]);

        const scoreLabel = competency.querySelector('.cr-progress-bar-label').innerText.trim();
        const scoreMap = {
            'Unsatisfactory': 0,
            'Approaching Competence': 0.6,
            'Competent': 1,
            'Exemplary': 1
        };

        const score = scoreMap[scoreLabel] || 0;
        totalScore += weight * score;
        totalWeight += weight;
    });

    return totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "calculate_score") {
            sendResponse({score: calculateTotalScore().toFixed(2)});
        }
    }
);
