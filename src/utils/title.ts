export const titleProxy = {} as { value: string };
Reflect.defineProperty(titleProxy, "value", {
  get() {
    let title = document.title;
    if (title.endsWith(" - CHROCK-SPACE")) {
      title = title.substr(0, title.length - 15);
    }
    return title;
  },
  set(val) {
    document.title = val ? `${val} - CHROCK-SPACE` : "CHROCK-SPACE";
  },
});
