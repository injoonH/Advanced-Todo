export default class Weather {
    constructor() {
        this.API_KEY = `a746821e9c164991a4b6e385a4fc1852`;
    }

    getWeather(lat, lng) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${this.API_KEY}&units=metric`
        )
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                console.log(json);
            });
    }

    handleGeoSuccess(position) {
        const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        };
        localStorage.setItem("coords", JSON.stringify(coords));
        this.getWeather(coords.latitude, coords.longitude);
    }

    handleGeoError(position) {
        console.log(`Can't access geo location`);
    }

    askCoords() {
        navigator.geolocation.getCurrentPosition(
            this.handleGeoSuccess.bind(this),
            this.handleGeoError
        );
    }

    loadCoords() {
        const loadedCoords = localStorage.getItem("coords");
        if (loadedCoords === null) this.askCoords();
        else {
            const coords = JSON.parse(loadedCoords);
            this.getWeather(coords.latitude, coords.longitude);
        }
    }
}
