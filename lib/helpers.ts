export function slugString(name: string) {
  let url = "";
  url = name
    .trim()
    .replaceAll(" ", "-")
    // eslint-disable-next-line no-useless-escape
    .replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>{}\[\]\\\/]/gi, "")
    .toLowerCase();
  return url;
}
