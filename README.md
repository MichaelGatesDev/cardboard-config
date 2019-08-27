# Cardboard Config

## What it does

Allows you to write a class with a bunch of constants, serialize it to a `.json` file, and deserialize it back to a typed object.

## What it does not do

* Allow you to use different configuration formats (currently)

## How to use

1. Add the latest version of this project

```
yarn add cardboard-config
```

2. Write a configuration class with constant properties

```ts
class MyCoolConfig {
    public version: string = "9.1.5b-ALPHA";
    public checkUpdates: boolean = false;
}
```

3. Serialize the configuration and load it as an object

```ts
    try {
        const result: ConfigIOResult = await ConfigUtils.createIfNotExistsAndLoad<MyCoolConfig>(
            "my-cool-config.json", // path
            MyCoolConfig,
            [
                "my-cool-config.json" // path again as constructor arg
            ]
        );
        if (result.wasCreated) {
            Logger.info("Created classroom checks spreadsheet config!");
        }
        let loadedConfig = result.loaded as MyCoolConfig;
    } catch (error) {
        throw error;
    }
```

## Problems / Troubleshooting

Please [submit an issue](https://github.com/MichaelGatesDev/cardboard-config/issues/new).