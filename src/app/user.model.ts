export class User {
    constructor(
        public name: string,
        public infix: string,
        public lastname: string,
        public street: string,
        public housenumber: number,
        public additive: string,
        public postalcode: string,
        public city: string,
        public id: number
    ) {}

    public get fullName() {
        if (this.infix) {
            return `${this.name} ${this.infix} ${this.lastname}`;
        } else {
            return `${this.name} ${this.lastname}`;
        }
    }
}