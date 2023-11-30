export function addUser(data) {
    fetch('http://localhost:5505/addUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response =>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(result => {
        console.log(result);
    })
    .catch(error => {
        console.error(error);
    });
}