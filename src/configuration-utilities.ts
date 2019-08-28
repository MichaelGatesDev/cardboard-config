import * as fs from "fs";
import { ConfigBase } from "./configuration";

import { FileUtils } from "@michaelgatesdev/common";

export interface ConfigIOResult {
    wasCreated: boolean;
    loaded: ConfigBase;
}

export class ConfigurationUtilities {

    public static async create<T extends ConfigBase>(base: new (...args: any[]) => T, baseArgs: any[]): Promise<boolean> {
        if (baseArgs.length < 1) { throw new Error("No path argument was passed to the constructor"); }
        await new base(...baseArgs).save();
        return true;
    }

    public static async createIfNotExists<T extends ConfigBase>(base: new (...args: any[]) => T, baseArgs: any[]): Promise<boolean> {
        if (baseArgs.length < 1) { throw new Error("No path argument was passed to the constructor"); }
        const path = baseArgs[0];
        if (await FileUtils.checkExists(path)) { return false; }
        return this.create<T>(base, baseArgs);
    }

    public static async load<T extends ConfigBase>(base: new (...args: any[]) => T, baseArgs: any[]): Promise<ConfigBase> {
        if (baseArgs.length < 1) { throw new Error("No path argument was passed to the constructor"); }
        const path = baseArgs[0];
        if (await FileUtils.checkExists(path)) { throw new Error(`Can not load configuration because it does not exist: ${path}`); }
        const rawData = await fs.promises.readFile(path, {
            encoding: "utf8",
        });
        const data = JSON.parse(rawData);
        const deserialized: ConfigBase = new base(...baseArgs).deserialize(data);
        return deserialized;
    }

    public static async createIfNotExistsAndLoad<T extends ConfigBase>(base: new (...args: any[]) => T, baseArgs: any[]): Promise<ConfigIOResult> {
        const wasCreated = await ConfigurationUtilities.createIfNotExists(base, baseArgs);
        const loadedConfigBase = await ConfigurationUtilities.load(base, baseArgs);
        return { wasCreated, loaded: loadedConfigBase };
    }

}