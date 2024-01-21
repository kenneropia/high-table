import React from "react";

const savedLocationsKey = "saved-locations";

function setSidebarState(newValue: Array<string>) {
  const json = JSON.stringify(newValue);
  window.localStorage.setItem(savedLocationsKey, json);
  // On localStoage.setItem, the storage event is only triggered on other tabs and windows.
  // So we manually dispatch a storage event to trigger the subscribe function on the current window as well.
  window.dispatchEvent(new StorageEvent("storage", { key: "sidebar", json }));
}

const store = {
  getSnapshot: () => localStorage.getItem("sidebar") as SidebarState,
  subscribe: (listener: () => void) => {
    window.addEventListener("storage", listener);
    return () => void window.removeEventListener("storage", listener);
  },
};

// Set the initial value.
if (!store.getSnapshot()) {
  localStorage.setItem("sidebar", "collapsed" satisfies SidebarState);
}

export function useSavedLocations() {
  const sidebarState = React.useSyncExternalStore(
    store.subscribe,
    store.getSnapshot
  );
}
