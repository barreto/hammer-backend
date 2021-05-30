export default class User {
    constructor(
        private username: string,
        private email: string,
        private password: string,
        private nickname?: string
    ) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    get Username() {
        return this.username;
    }
    set Username(value: string) {
        this.username = value;
    }

    get Email() {
        return this.email;
    }
    set Email(value: string) {
        this.email = value;
    }

    get Password() {
        return this.password;
    }
    set Password(value: string) {
        this.password = value;
    }

    get Nickname() {
        return this.nickname;
    }
    set Nickname(value: string) {
        const isValid = value && value.trim();
        this.nickname = isValid ? value : null;
    }
}
