export class Transfer {

    constructor(
        public id: string,
        public username: string,
        public amount: number,
        public increment: number,
        public timestamp: Date,
    ) {
    }

}
