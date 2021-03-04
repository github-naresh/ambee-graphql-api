import { Logger } from '@nestjs/common';
import config from '~appConfig';
/**
 * Config Service
 */
export class ConfigService {
  private readonly logger = new Logger(ConfigService.name);
  /**
   * Config object
   */
  private config = {};

  /**
   * Constructor
   */
  constructor() {
    this.config = JSON.parse(JSON.stringify(config));
  }

  /**
   * Get value of config of a given key
   * @param key Config key name. Key format should follow =:
   * Filename separated by DOT (.) and config key in order.
   */
  get(key: string): any {
    const configPath = key.split('.');
    const traversedPath = [];
    let configObj = this.config;
    for (const path of configPath) {
      traversedPath.push(path);
      if (configObj[path] === undefined) {
        return null;
      }
      configObj = configObj[path];
    }
    return traversedPath.join('.') === key ? configObj : null;
  }

  set(key: string, value: any) {
    this.config[`${key}`] = value;
    return this;
  }
}
