import { afterEach, describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  determineConfigVersion,
  extractImageVersion,
  getPrimaryVersionFromCompose,
  getPrimaryVersionFromJsonCompose,
  getPrimaryVersionFromYamlCompose,
  updateAppConfig,
} from "../scripts/update-config";

const tempDirs: string[] = [];

const createTempAppDir = async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "update-config-"));
  tempDirs.push(tempDir);
  return tempDir;
};

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => fs.rm(dir, { recursive: true, force: true })));
});

describe("extractImageVersion", () => {
  test("extracts tags from tagged images", () => {
    expect(extractImageVersion("ghcr.io/example/app:1.2.3")).toBe("1.2.3");
    expect(extractImageVersion("registry.example.com:5000/example/app:4.5.6")).toBe("4.5.6");
    expect(extractImageVersion("ghcr.io/example/app:1.2.3@sha256:abc")).toBe("1.2.3");
  });

  test("returns null when the image has no tag", () => {
    expect(extractImageVersion("ghcr.io/example/app")).toBeNull();
    expect(extractImageVersion("ghcr.io/example/app:")).toBeNull();
  });
});

describe("primary service version resolution", () => {
  test("uses isMain from docker-compose.json", () => {
    expect(
      getPrimaryVersionFromJsonCompose({
        services: [
          { image: "postgres:17" },
          { image: "nextcloud:33.0.0-apache", isMain: true },
        ],
      }),
    ).toBe("33.0.0-apache");
  });

  test("uses x-runtipi.is_main from docker-compose.yml", () => {
    expect(
      getPrimaryVersionFromYamlCompose({
        services: {
          db: { image: "postgres:17" },
          app: {
            image: "ghcr.io/example/app:2.4.6",
            "x-runtipi": { is_main: true },
          },
        },
      }),
    ).toBe("2.4.6");
  });

  test("prefers docker-compose.yml before docker-compose.json", async () => {
    const appDir = await createTempAppDir();

    await Promise.all([
      fs.writeFile(
        path.join(appDir, "docker-compose.json"),
        JSON.stringify({
          services: [
            { image: "postgres:17" },
            { image: "ghcr.io/example/app:9.9.9", isMain: true },
          ],
        }),
      ),
      fs.writeFile(
        path.join(appDir, "docker-compose.yml"),
        `services:
  app:
    image: ghcr.io/example/app:1.0.0
    x-runtipi:
      is_main: true
x-runtipi:
  schema_version: 2
`,
      ),
    ]);

    expect(await getPrimaryVersionFromCompose(appDir)).toBe("1.0.0");
  });
});

describe("determineConfigVersion", () => {
  test("prefers the resolved primary version, then the current config version, then the incoming version", () => {
    expect(determineConfigVersion("3.0.0", "2.0.0", "1.0.0")).toBe("3.0.0");
    expect(determineConfigVersion(null, "2.0.0", "1.0.0")).toBe("2.0.0");
    expect(determineConfigVersion(null, undefined, "1.0.0")).toBe("1.0.0");
  });
});

describe("updateAppConfig", () => {
  test("keeps config.version aligned with the primary service image", async () => {
    const appDir = await createTempAppDir();
    const configPath = path.join(appDir, "config.json");
    const composePath = path.join(appDir, "docker-compose.json");

    await Promise.all([
      fs.writeFile(
        configPath,
        JSON.stringify({
          tipi_version: 4,
          version: "32.0.0-apache",
          updated_at: 0,
        }),
      ),
      fs.writeFile(
        composePath,
        JSON.stringify({
          services: [
            { image: "postgres:17" },
            { image: "nextcloud:33.0.0-apache", isMain: true },
          ],
        }),
      ),
    ]);

    await updateAppConfig(composePath, "17");

    const updatedConfig = JSON.parse(await fs.readFile(configPath, "utf-8"));

    expect(updatedConfig.tipi_version).toBe(5);
    expect(updatedConfig.version).toBe("33.0.0-apache");
    expect(updatedConfig.updated_at).toBeGreaterThan(0);
  });

  test("prefers the primary service from docker-compose.yml when both formats exist", async () => {
    const appDir = await createTempAppDir();
    const configPath = path.join(appDir, "config.json");

    await Promise.all([
      fs.writeFile(
        configPath,
        JSON.stringify({
          tipi_version: 4,
          version: "0.9.0",
          updated_at: 0,
        }),
      ),
      fs.writeFile(
        path.join(appDir, "docker-compose.yml"),
        `services:
  app:
    image: ghcr.io/example/app:2.1.0
    x-runtipi:
      is_main: true
x-runtipi:
  schema_version: 2
`,
      ),
      fs.writeFile(
        path.join(appDir, "docker-compose.json"),
        JSON.stringify({
          services: [{ image: "ghcr.io/example/app:9.9.9", isMain: true }],
        }),
      ),
    ]);

    await updateAppConfig(path.join(appDir, "docker-compose.json"), "9.9.9");

    const updatedConfig = JSON.parse(await fs.readFile(configPath, "utf-8"));

    expect(updatedConfig.version).toBe("2.1.0");
  });

  test("falls back to the current config version when no primary service is declared", async () => {
    const appDir = await createTempAppDir();
    const configPath = path.join(appDir, "config.json");
    const composePath = path.join(appDir, "docker-compose.json");

    await Promise.all([
      fs.writeFile(
        configPath,
        JSON.stringify({
          tipi_version: 1,
          version: "1.0.0",
          updated_at: 0,
        }),
      ),
      fs.writeFile(
        composePath,
        JSON.stringify({
          services: [{ image: "postgres:17" }],
        }),
      ),
    ]);

    await updateAppConfig(composePath, "17");

    const updatedConfig = JSON.parse(await fs.readFile(configPath, "utf-8"));

    expect(updatedConfig.tipi_version).toBe(2);
    expect(updatedConfig.version).toBe("1.0.0");
  });
});
