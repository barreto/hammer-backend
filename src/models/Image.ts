class Image {
    constructor(
        private fromImage: string,
        private tag: string,
        private message?: string,
        private fromSrc?: string,
        private repo?: string,
        private platform: string = ''
    ) {}

    get FromImage() {
        return this.fromImage;
    }
    set FromImage(value: string) {
        this.fromImage = value;
    }

    get Tag() {
        return this.tag;
    }
    set Tag(value: string) {
        this.tag = value;
    }

    get Message() {
        return this.message;
    }
    set Message(value: string) {
        this.message = value;
    }

    get FromSrc() {
        return this.fromSrc;
    }
    set FromSrc(value: string) {
        this.fromSrc = value;
    }

    get Repo() {
        return this.repo;
    }
    set Repo(value: string) {
        this.repo = value;
    }

    get Platform() {
        return this.platform;
    }
    set Platform(value: string) {
        this.platform = value;
    }

    getDTO() {
        let dto = {};
        const attributes = {
            fromImage: this.fromImage,
            fromSrc: this.fromSrc,
            repo: this.repo,
            tag: this.tag,
            message: this.message,
            platform: this.platform
        };
        const getValidAttributes = ([attrKey, attrValue]) => {
            if (attrValue) dto[attrKey] = attrValue;
        };
        Object.entries(attributes).forEach(getValidAttributes);
        return dto;
    }
}
export default Image;
