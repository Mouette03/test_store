import path from "node:path";
import fs from "fs/promises";
import { parse as parseYaml } from "yaml";

const packageFile = process.argv[2];
const newVersion = process.argv[3];

export type AppConfig = {
  tipi_version: number | string;
  version: string;
  updated_at: number;
};

type JsonComposeService = {
  image?: string;
  isMain?: boolean;
};

type JsonCompose = {
  services?: JsonComposeService[];
};

type YamlComposeService = {
  image?: string;
  "x-runtipi"?: {
    is_main?: boolean;
  };
};

type YamlCompose = {
  services?: Record<string, YamlComposeService>;
};

export const extractImageVersion = (image: string) => {
  const imageWithoutDigest = image.split("@")[0];
  const lastSlashIndex = imageWithoutDigest.lastIndexOf("/");
  const lastColonIndex = imageWithoutDigest.lastIndexOf(":");

  if (lastColonIndex <= lastSlashIndex) {
    return null;
  }

  return imageWithoutDigest.slice(lastColonIndex + 1);
};

export const getPrimaryVersionFromJsonCompose = (compose: JsonCompose) => {
  const primaryService = compose.services?.find((service) => service.isMain);

  return primaryService?.image ? extractImageVersion(primaryService.image) : null;
};

export const getPrimaryVersionFromYamlCompose = (compose: YamlCompose) => {
  const primaryService = Object.values(compose.services ?? {}).find(
    (service) => service["x-runtipi"]?.is_main,
  );

  return primaryService?.image ? extractImageVersion(primaryService.image) : null;
};

export const getPrimaryVersionFromCompose = async (packageRoot: string) => {
  const composeJsonPath = path.join(packageRoot, "docker-compose.json");

  try {
    const composeJson = JSON.parse(await fs.readFile(composeJsonPath, "utf-8")) as JsonCompose;
    const primaryVersion = getPrimaryVersionFromJsonCompose(composeJson);

    if (primaryVersion) {
      return primaryVersion;
    }
  } catch {
    // Fallback to docker-compose.yml below.
  }

  const composeYamlPath = path.join(packageRoot, "docker-compose.yml");

  try {
    const composeYaml = parseYaml(await fs.readFile(composeYamlPath, "utf-8")) as YamlCompose;
    return getPrimaryVersionFromYamlCompose(composeYaml);
  } catch {
    return null;
  }
};

export const determineConfigVersion = (
  primaryVersion: string | null,
  currentVersion: string | undefined,
  newVersion: string,
) => primaryVersion ?? currentVersion ?? newVersion;

export const updateAppConfig = async (packageFile: string, newVersion: string) => {
  try {
    const packageRoot = path.dirname(packageFile);
    const configPath = path.join(packageRoot, "config.json");

    const config = await fs.readFile(configPath, "utf-8");
    const configParsed = JSON.parse(config) as AppConfig;
    const primaryVersion = await getPrimaryVersionFromCompose(packageRoot);

    configParsed.tipi_version = Number(configParsed.tipi_version) + 1;
    configParsed.version = determineConfigVersion(primaryVersion, configParsed.version, newVersion);
    configParsed.updated_at = new Date().getTime();

    await fs.writeFile(configPath, JSON.stringify(configParsed, null, 2));
  } catch (e) {
    console.error(`Failed to update app config, error: ${e}`);
  }
};

if (import.meta.main) {
  if (!packageFile || !newVersion) {
    console.error("Usage: node update-config.js <packageFile> <newVersion>");
    process.exit(1);
  }

  updateAppConfig(packageFile, newVersion);
}
