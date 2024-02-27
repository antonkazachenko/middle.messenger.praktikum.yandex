function first(list: any) {
  if (!Array.isArray(list)) {
    return undefined;
  }

  return list.length ? list[0] : undefined;
}

export default first;