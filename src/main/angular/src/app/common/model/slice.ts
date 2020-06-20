export class Slice<T> {
    constructor(
        public content: T,
        public size: number,
        public number: number,
        public numberOfElements: number,
        public first: boolean,
        public last: boolean,
        public empty: boolean,
    ) {
    }
}
