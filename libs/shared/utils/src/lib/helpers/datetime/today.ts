export class Today extends Date {
	constructor() {
		super();
		this.setUTCHours(0, 0, 0, 0);
	}
}
