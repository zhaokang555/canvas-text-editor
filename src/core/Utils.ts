export function isCtrlOrCmdPressed(evt: KeyboardEvent) {
  // @ts-ignore
  const platform = window.navigator?.userAgentData?.platform || window.navigator?.platform;
  return platform.toLowerCase().indexOf('mac') > -1 ? evt.metaKey : evt.ctrlKey;
}

export function paste() {
  window.navigator.clipboard.readText();
}