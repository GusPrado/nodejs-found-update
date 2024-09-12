export function buildRoutePath(path) {
  const routeParamsRegex = /:([a-zA-Z]+)/g;
  const pathWithParams = path.replaceAll(
    routeParamsRegex,
    '(?<$1>[a-z0-9-_]+)'
  );

  const pathRegEx = new RegExp(`^${pathWithParams}(?<query>\\?(.*))?$`);

  return pathRegEx;
}
