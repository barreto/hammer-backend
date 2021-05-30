class Container {
    constructor(
        private name: string,
        private hostname: string,
        private domainname: string,
        private user: string,
        private attachStdin: boolean,
        private attachStdout: boolean,
        private attachStderr: boolean,
        private exposedPorts: any,
        private env: string[],
        private image: string,
        private entrypoint: string,
        private networkDisabled: boolean
    ) {}
    get Name() {
        return this.name;
    }
    set Name(value: string) {
        this.name = value;
    }

    get Hostname() {
        return this.hostname;
    }
    set Hostname(value: string) {
        this.hostname = value;
    }

    get Domainname() {
        return this.domainname;
    }
    set Domainname(value: string) {
        this.domainname = value;
    }

    get User() {
        return this.user;
    }
    set User(value: string) {
        this.user = value;
    }

    get AttachStdin() {
        return this.attachStdin;
    }
    set AttachStdin(value: boolean) {
        this.attachStdin = value;
    }

    get AttachStdout() {
        return this.attachStdout;
    }
    set AttachStdout(value: boolean) {
        this.attachStdout = value;
    }

    get AttachStderr() {
        return this.attachStderr;
    }
    set AttachStderr(value: boolean) {
        this.attachStderr = value;
    }

    get ExposedPorts() {
        return this.exposedPorts;
    }
    set ExposedPorts(value: string) {
        this.exposedPorts = value;
    }

    get Env() {
        return this.env;
    }
    set Env(value: string[]) {
        this.env = value;
    }

    get Image() {
        return this.image;
    }
    set Image(value: string) {
        this.image = value;
    }

    get Entrypoint() {
        return this.entrypoint;
    }
    set Entrypoint(value: string) {
        this.entrypoint = value;
    }

    get NetworkDisabled() {
        return this.networkDisabled;
    }
    set NetworkDisabled(value: boolean) {
        this.networkDisabled = value;
    }

    getDTO() {
        let dto = {};
        const attributes = {
            hostname: this.hostname,
            domainname: this.domainname,
            user: this.user,
            attachStdin: this.attachStdin,
            attachStdout: this.attachStdout,
            attachStderr: this.attachStderr,
            exposedPorts: this.exposedPorts,
            env: this.env,
            image: this.image,
            entrypoint: this.entrypoint,
            networkDisabled: this.networkDisabled
        };
        const getValidAttributes = ([attrKey, attrValue]) => {
            if (attrValue) dto[attrKey] = attrValue;
        };
        Object.entries(attributes).forEach(getValidAttributes);
        return dto;
    }
}
export default Container;
