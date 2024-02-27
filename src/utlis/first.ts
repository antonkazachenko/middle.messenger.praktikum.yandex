// eslint-disable-next-line @typescript-eslint/no-explicit-any
function first(list: any) {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length ? list[0] : undefined;
}

export default first;
