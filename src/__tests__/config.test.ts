import { ConfigBase } from "../configuration";
import { ConfigurationUtilities } from "../configuration-utilities";

class TestConfig extends ConfigBase {
    public nothing = "eaawefhauoewf";
}

test("should create a config", () => {
    ConfigurationUtilities.create<TestConfig>(
        TestConfig,
        [
            "test.config.json",
        ],
    ).then((result) => {
        expect(result);
    }).catch((err) => {
        throw new Error(err);
    });
});
