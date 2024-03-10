export class Response {
    status;
    json;
    headers;

    constructor(responce){
        this.responce = responce
    }

    async init(){
        this.json = await this.responce.json();
        this.status = await this.responce.status();
        this.headers = await this.responce.headers();
        return this;
    }
}
