import { FileUtils } from "@michaelgatesdev/common-io";
import { ConfigBase } from "../configuration";
import { ConfigurationUtilities } from "../configuration-utilities";

class TestConfig extends ConfigBase {
    public nothing = "eaawefhauoewf";
}

const testConfigPath = "test.config.json";

test("should create a config", async () => {
    const result = await ConfigurationUtilities.create<TestConfig>(
        TestConfig,
        [
            testConfigPath,
        ],
    );
    expect(result);
});

test("should delete a config", async () => {
    if (await FileUtils.checkExists(testConfigPath)) {
        const delRes = await FileUtils.delete(testConfigPath);
        expect(delRes);
    }
});

test("should create and load config", async () => {
    const result = await ConfigurationUtilities.createIfNotExistsAndLoad<TestConfig>(
        TestConfig,
        [
            testConfigPath,
        ],
    );
    const config = result.loaded as TestConfig;
    expect(result.wasCreated && result.loaded && config.nothing);
});

test("should delete a config", async () => {
    if (await FileUtils.checkExists(testConfigPath)) {
        const delRes = await FileUtils.delete(testConfigPath);
        expect(delRes);
    }
});
