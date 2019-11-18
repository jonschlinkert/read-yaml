export = readYaml;

declare function readYaml(filepath: string, callback: (err: any, data: object) => void): void;
declare function readYaml(filepath: string, options: any, callback: (err: any, data: object) => void): void;
declare namespace readYaml {
  function sync(filepath: string, options?: any): object;
}
