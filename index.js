const refs = {
    days: document.querySelector('span[data-value="days"]'),
    hours: document.querySelector('span[data-value="hours"]'),
    mins: document.querySelector('span[data-value="mins"]'),
    secs: document.querySelector('span[data-value="secs"]'),
    timer: document.querySelector('.timer'),
}

class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
        this.selector = selector;
        this.targetDate = targetDate;
        this.onTick = onTick;

        this.init();
        this.start();
    }

    init() {
        const time = this.getTimeComponents(this.targetDate- Date.now());
        this.onTick(time);
    }

    start() {
        if (Date.now() > this.targetDate) {
            clearInterval(intervalId);
        }

        const intervalId = setInterval(() => {
            const endTime = this.targetDate - Date.now();

            const time = this.getTimeComponents(endTime);

            this.onTick(time);
        }, 1000);
    };

    getTimeComponents(time) {
        const days = (Math.floor(time / (1000 * 60 * 60 * 24)));

        const hours = (Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));

        const mins = (Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));

        const secs = (Math.floor((time % (1000 * 60)) / 1000));
    
        return { days, hours, mins, secs };
    };

}

const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2021'),
    onTick: updateTimer,
});

function updateTimer({ days, hours, mins, secs }) {
        refs.days.textContent = days;
        refs.hours.textContent = hours;
        refs.mins.textContent = mins;
        refs.secs.textContent = secs;
}

// window.addEventListener('onbeforeunload', timer.start.bind(timer));