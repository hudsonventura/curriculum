type StringMap = { [key: string]: string };

export default class StringsHandler {
  private strings: StringMap;

  constructor(data: StringMap) {
    this.strings = data;

    return new Proxy(this, {
      get: (target, prop: string) => {
        if (typeof prop !== 'string') return undefined;

        if (prop in target.strings) {
          return target.strings[prop];
        } else {
          // Captura a stack trace
          const err = new Error();
          const stack = err.stack?.split('\n') || [];

          // Pula a linha 0 ("Error") e 1 (esta função) — pega a terceira como chamada do usuário
          const caller = stack[2]?.trim() || 'Origem desconhecida';

          console.warn(`⚠️ Chave "${prop}" não encontrada nas strings. Chamada feita em: ${caller}`);
          return `======> StringsHandler[${prop}] <======`;
        }
      }
    });
  }
}
