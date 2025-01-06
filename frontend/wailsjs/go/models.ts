export namespace main {
	
	export class Message {
	    Content: string;
	    Author: string;
	    UUID: number[];
	
	    static createFrom(source: any = {}) {
	        return new Message(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Content = source["Content"];
	        this.Author = source["Author"];
	        this.UUID = source["UUID"];
	    }
	}
	export class PlainMessage {
	    Content: string;
	    Author: string;
	
	    static createFrom(source: any = {}) {
	        return new PlainMessage(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Content = source["Content"];
	        this.Author = source["Author"];
	    }
	}

}

