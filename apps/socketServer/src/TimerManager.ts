import { type LoteriaIONamesapce } from 'anime-sockets-types';

class TimeManager {
	private static instance: TimeManager;

	private task: LoteriaTask | null = null;
	private constructor() {}

	public static getInstance(): TimeManager {
		if (!TimeManager.instance) {
			TimeManager.instance = new TimeManager();
		}

		return TimeManager.instance;
	}

	public getTask() {
		return this.task;
	}

	public setTask(task: LoteriaTask) {
		this.task = task;
	}
}

type Typefn = () => Promise<void>;

class LoteriaTask {
	private loteria: LoteriaIONamesapce = null as unknown as LoteriaIONamesapce;
	private time = 0;
	private timeElapsed = 0;

	private intervalId: NodeJS.Timeout | undefined;

	private isPlaying = false;
	private fn: Typefn = null as unknown as Typefn;
	private cancel = false;

	constructor(loteria: LoteriaIONamesapce, fn: Typefn, time: number) {
		this.loteria = loteria;
		this.fn = fn;
		this.time = time;
	}

	private async excecute() {
		console.log('execute loteriaTask');
		await this.fn();
		if (this.cancel) {
			console.log('cancel execute');
			this.stop();
		} else {
			this.start();
		}
	}

	private startInterval() {
		this.intervalId = setInterval(async () => {
			this.timeElapsed = this.timeElapsed + 100;

			const progress = Math.max(100 - (this.timeElapsed * 100) / this.time, 0);
			console.log('timeElapsed', this.timeElapsed, progress);
			this.loteria.emit('updateProgress', progress);
			if (progress === 0) {
				this.stop();
				this.excecute();
			}
		}, 100);
		this.isPlaying = true;
	}

	public cancelInterval() {
		console.log('cancel interval');

		this.cancel = true;
	}

	public start() {
		clearInterval(this.intervalId);
		console.log('loteriaTask start timer');
		this.timeElapsed = 0;
		this.startInterval();
		this.loteria.emit('updateProgress', 100);
	}

	public pause() {
		if (this.isPlaying) {
			this.isPlaying = false;
			clearInterval(this.intervalId);
		}
	}
	public reset() {
		this.stop();
		this.start();
	}

	public play() {
		if (!this.isPlaying) {
			this.startInterval();
		}
	}

	public togglePause() {
		if (this.isPlaying) {
			this.pause();
		} else {
			this.play();
		}
	}

	public stop() {
		clearInterval(this.intervalId);
		this.intervalId = undefined;
		this.isPlaying = false;
		this.cancel = false;
	}

	public isPaused() {
		return !this.isPlaying;
	}
}

export { LoteriaTask, TimeManager };
