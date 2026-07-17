import path from "node:path";
import fs from "fs/promises";
import { fileURLToPath } from "node:url";
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
  "x-runtipi"?: Record<string, unknown>;
};

type YamlCompose = {
  services?: Record<string, YamlComposeService>;
};

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isYamlCompose = (value: unknown): value is YamlCompose => {
  if (!isRecord(value)) {
    return false;
  }

  if (!("services" in value) || value.services === undefined) {
    return false;
  }

  return isRecord(value.services);
};

const getYamlServiceMeta = (service: YamlComposeService) => {
  const runtipiMeta = service["x-runtipi"];

  if (!isRecord(runtipiMeta)) {
    return {};
  }

  return {
    isMain: typeof runtipiMeta.is_main === "boolean" ? runtipiMeta.is_main : undefined,
  };
};

const hasErrorCode = (error: unknown): error is { code: string } =>
  isRecord(error) && typeof error.code === "string";

export const extractImageVersion = (image: string) => {
  const imageWithoutDigest = image.split("@")[0];
  const lastSlashIndex = imageWithoutDigest.lastIndexOf("/");
  const lastColonIndex = imageWithoutDigest.lastIndexOf(":");

  if (lastColonIndex === -1 || lastColonIndex < lastSlashIndex) {
    return null;
  }

  const version = imageWithoutDigest.slice(lastColonIndex + 1);

  return version.length > 0 ? version : null;
};

export const getPrimaryVersionFromJsonCompose = (compose: JsonCompose) => {
  const primaryService = compose.services?.find((service) => service.isMain);

  return primaryService?.image ? extractImageVersion(primaryService.image) : null;
};

export const getPrimaryVersionFromYamlCompose = (compose: YamlCompose) => {
  const primaryService = Object.values(compose.services ?? {}).find(
    (service) => getYamlServiceMeta(service).isMain,
  );

  return primaryService?.image ? extractImageVersion(primaryService.image) : null;
};

export const getPrimaryVersionFromCompose = async (packageRoot: string) => {
  const composeYamlPath = path.join(packageRoot, "docker-compose.yml");

  try {
    const composeYaml = parseYaml(await fs.readFile(composeYamlPath, "utf-8"));
    if (!isYamlCompose(composeYaml)) {
      throw new Error("Invalid docker-compose.yml: missing or invalid services structure");
    }

    const primaryVersion = getPrimaryVersionFromYamlCompose(composeYaml);

    if (primaryVersion) {
      return primaryVersion;
    }
  } catch (error) {
    if (!hasErrorCode(error) || error.code !== "ENOENT") {
      console.warn(`Failed to read primary version from docker-compose.yml: ${error}`);
    }
  }

  const composeJsonPath = path.join(packageRoot, "docker-compose.json");

  try {
    const composeJson = JSON.parse(await fs.readFile(composeJsonPath, "utf-8")) as JsonCompose;
    return getPrimaryVersionFromJsonCompose(composeJson);
  } catch (error) {
    if (!hasErrorCode(error) || error.code !== "ENOENT") {
      console.warn(`Failed to read primary version from docker-compose.json: ${error}`);
    }

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
    if (!newVersion) {
      throw new Error("newVersion is required");
    }

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

const isMainModule = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMainModule) {
  if (!packageFile || !newVersion) {
    console.error("Usage: node update-config.js <packageFile> <newVersion>");
    process.exit(1);
  }

  updateAppConfig(packageFile, newVersion);
}
