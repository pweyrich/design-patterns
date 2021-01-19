interface Subject {
    registerObserver(observer: Observer)
    removeObserver(observer: Observer)
    notifyObserver()
}

interface Observer {
    update(state:any)
}

class WeatherData implements Subject {
    observers: Array<Observer> = [];
    temperature: number;
    notifyObserver() {
        this.observers.forEach(observer => observer.update(this.temperature));
    }

    registerObserver(observer: Observer) {
        this.observers.push(observer);
    }

    removeObserver(observer: Observer) {
        const index = this.observers.indexOf(observer);
        this.observers.splice(index, 1);
    }

    setTemperature(temperature: number) {
        this.temperature = temperature;
        this.notifyObserver();
    }

    getTemperature(): number {
        return this.temperature;
    }
}

class WeatherDataDisplay implements Observer {
    temperature: number;
    update(temperature: number) {
        this.temperature = temperature;
        this.display();
    }

    display() {
        console.log('Temperature is ', this.temperature, ' °C')
    }
}


const weatherData = new WeatherData();
const weatherDataDisplay = new WeatherDataDisplay();

weatherData.setTemperature(21.2);
setTimeout(() => weatherData.setTemperature(34.6), 2000);
weatherData.registerObserver(weatherDataDisplay);
weatherData.setTemperature(29.0);
// console.log('Hello World');
