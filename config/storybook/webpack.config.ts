import webpack, { DefinePlugin, RuleSetRule } from "webpack";
import path from "path";
import { cssLoaders } from "../build/loaders/cssLoaders";
import { BuildPaths } from "../build/types/configs";

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPaths = {
        build: "",
        html: "",
        entry: "",
        src: path.resolve(__dirname, "..", "..", "src"),
    };

    config.resolve?.modules?.push(paths.src);
    config.resolve?.extensions?.push(".ts", ".tsx");

    // eslint-disable-next-line no-param-reassign
    /*  @ts-ignore */
    config.module.rules = config.module.rules.map((rule: RuleSetRule) => {
        if (/svg/.test(rule.test as string)) {
            return { ...rule, exclude: /\.svg$/i };
        }
        return rule;
    });

    config?.plugins?.push(
        new webpack.DefinePlugin({
            __IS_DEV__: true,
        })
    );

    config?.module?.rules?.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"],
    });

    config?.module?.rules?.push(cssLoaders(true));

    return config;
};
