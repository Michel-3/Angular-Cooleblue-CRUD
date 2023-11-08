export class User {
        public name!: string;
        public infix?: string;
        public lastname!: string;
        public street!: string;
        public housenumber!: string;
        public additive?: string;
        public postalcode!: string;
        public city!: string;
        public id!: string;

    constructor(obj: any) {
        this.name = obj.name;
        this.infix = obj.infix ?? null;
        this.lastname = obj.lastname;
        this.street = obj.street;
        this.housenumber = obj.housenumber;
        this.additive = obj.additive ?? null;
        this.postalcode = obj.postalcode;
        this.city = obj.city;
        this.id = obj.id;
    }

    public get fullName() {
        if (this.infix) {
            return `${this.name} ${this.infix} ${this.lastname}`;
        } else {
            return `${this.name} ${this.lastname}`;
        }
    }

    public get fullStreetInfo() {
        if (this.additive) {
            return `${this.street} ${this.housenumber} ${this.additive}`;
        } else {
            return `${this.street} ${this.housenumber}`;
        }
    }

    public get postalcodeAndCity() {
        return `${this.postalcode} ${this.city}`;
    }
}