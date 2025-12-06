
document.getElementById('pairForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phoneInput = document.getElementById('phone');
    const submitBtn = document.getElementById('submitBtn');
    const resultArea = document.getElementById('result');
    const pairingCodeSpan = document.getElementById('pairingCode');

    const phone = phoneInput.value;

    if (!phone) return;

    submitBtn.disabled = true;
    submitBtn.textContent = "Generating...";
    resultArea.classList.add('hidden');

    try {
        const response = await fetch('/pair', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phone })
        });

        const data = await response.json();

        if (data.code) {
            resultArea.classList.remove('hidden');
            pairingCodeSpan.textContent = data.code;
        } else if (data.error) {
            alert('Error: ' + data.error);
        }
    } catch (err) {
        alert('Failed to connect to server');
        console.error(err);
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Create";
        updateSessions();
    }
});

async function updateSessions() {
    try {
        const res = await fetch('/sessions');
        const sessions = await res.json();
        const list = document.getElementById('sessionList');
        if (list) {
            list.innerHTML = sessions.map(s => `<li>${s} <span class="badge">Active</span></li>`).join('');
        }
    } catch (e) {
        console.error("Failed to fetch sessions", e);
    }
}

document.addEventListener('DOMContentLoaded', updateSessions);

document.getElementById('copyBtn').addEventListener('click', () => {
    const code = document.getElementById('pairingCode').textContent;
    navigator.clipboard.writeText(code);
    alert('Code copied!');
});
