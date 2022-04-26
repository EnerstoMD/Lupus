export class Event {
    constructor(
        public id:string,
        public title:string,
        public start:string,
        public end:string,
        public description:string,
        public is_confirmed:boolean,
        public created_by:string,
    ){}
}