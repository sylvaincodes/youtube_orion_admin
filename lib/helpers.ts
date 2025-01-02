export function slugString(name: string) {
  let url = "";
  url = name
    .trim()
    .replaceAll(" ", "-")
    .replaceAll(/[`~!@#$%^&*()_|+\=?;:'",.<>{}\[\]\\\/]/gi, "")
    .toLowerCase();
  return url;
}
