export class Player {
    constructor(
        public username: string = null,
        public firstName: string = null,
        public lastName: string = null,
        public balance: number = 2000,
        public lastUsedIncrement: number = 2000,
    ) {
    }
}
