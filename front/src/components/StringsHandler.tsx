type StringMap = { [key: string]: string };

export default class StringsHandler {
  private strings: StringMap;

  constructor(data: StringMap) {
    this.strings = data;

    return new Proxy(this, {
      get: (target, prop: string | symbol) => {
        if (typeof prop === 'symbol') return undefined;

        const propStr = String(prop);
        if (propStr in target.strings) {
          return target.strings[propStr];
        } else {
          const err = new Error();
          const stack = err.stack?.split('\n') || [];
          const caller = stack[2]?.trim() || 'Origem desconhecida';

          console.warn(`⚠️ Chave "${propStr}" não encontrada nas strings. Chamada feita em: ${caller}`);
          return `======> StringsHandler[${propStr}] <======`;
        }
      }
    }) as StringsHandler;
  }
}

