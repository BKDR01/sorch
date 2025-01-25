const apiUrl = 'https://api.nationalize.io';
const btn = document.querySelector('#btn');
const row = document.querySelector('#row');
const input = document.querySelector('#serch');

async function getData(name) {
    try {
        const response = await fetch(`${apiUrl}?name=${name}`);
        if (!response.ok) throw new Error('Failed to fetch data');

        const data = await response.json();
        row.innerHTML = `<h2>Results for: ${name}</h2>`;

        if (data.country.length > 0) {
            data.country.forEach(item => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `${(item.probability * 100).toFixed(2)}% - ${item.country_id}`;
                row.appendChild(card);
            });
        } else {
            row.innerHTML += '<p>No data found for the entered name.</p>';
        }
    } catch (error) {
        console.error(error);
        row.innerHTML = '<p>Failed to fetch data. Please try again later.</p>';
    }
}

btn.addEventListener('click', () => {
    const name = input.value.trim();
    if (name) {
        row.innerHTML = `<p>Searching for: ${name}</p>`;
        getData(name);
    } else {
        row.innerHTML = '<p>Please enter a name to search.</p>';
    }
});