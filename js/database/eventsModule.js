export async function fetchEventsWhere(eventDay) {
    const ApiEndpoint = `http://localhost:5505/api/events?eventDay=${eventDay}`;
    try {
        const response = await fetch(ApiEndpoint);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const events = await response.json();
        
        return events
    } catch (error) {
        console.error('Error fetching events: ', error);
        return [];
    }
}

export async function fetchNextEvents() {
    const today = new Date();
    const nextFiveDays = new Date(today);
    nextFiveDays.setDate(today.getDate() + 5);

    const startDate = today.toISOString().split('T')[0];
    const endDate = nextFiveDays.toISOString().split('T')[0];

    const ApiEndpoint = `http://localhost:5505/api/events?startDate=${startDate}&endDate=${endDate}`;
    try {
        const response = await fetch(ApiEndpoint);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const events = await response.json();
        return events
    } catch (error) {
        console.error('Error fetching events: ', error);
        return [];
    }
}

export async function fetchUser(userName) {
    const ApiEndpoint = `http://localhost:5505/api/events?userName=${userName}`;
    try {
        const response = await fetch(ApiEndpoint);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const user = await response.json();
        
        return user
    } catch (error) {
        console.error('Error fetching user: ', error);
        return [];
    }
}