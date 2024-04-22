document.getElementById('calculate').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {message: "calculate_score"}, function(response) {
            document.getElementById('score').innerText = `${response.score}%`;
        });
    });
});
