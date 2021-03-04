import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class EnvService {
  private readonly envConfig: { [key: string]: string };
  private logger = new Logger(EnvService.name);
  
  get(key: string, defaultVal: any = null): string {
    return (this.envConfig !== undefined && this.envConfig[key] ? this.envConfig[key] : process.env[key]) || defaultVal;
  }

  /**
   * @link https://bloomlab.blogspot.com/2018/06/typescript-recipe-elegant-parse-boolean.html
   * @param key env key
   */
  getBooleanVal(key: string): boolean {
    const value = this.get(key);
    if (value == null) {
      return false;
    }

    if (value === 'true') {
      return true;
    }

    return typeof value === 'string' ? !!+value : !!value;
  }
}
