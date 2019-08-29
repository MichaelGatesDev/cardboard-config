import { promises as fsPromises } from "fs";

interface Serializable<T> {
    deserialize(input: object): T;
}

export abstract class ConfigBase implements Serializable<ConfigBase> {

    private configPath: string;

    public constructor(configPath: string) {
        this.configPath = configPath;
    }

    /**
     * Deserializes an object to a configuration
     */
    public deserialize(input: object): ConfigBase {
        Object.keys(input).forEach((key): void => {
            this[key as keyof this] = input[key as keyof object];
        });
        return this;
    }

    /**
     * Writes the configuration to a json file with 4-space indentation
     */
    public async save(): Promise<void> {
        await fsPromises.writeFile(this.configPath, JSON.stringify(this, (key, value) => {
            if (key === "configPath") { return undefined; }
            return value;
        }, 4), null);
    }
}
