export function getDeviceId(): string {
  if (typeof window === "undefined") return "server-default";

  let id = localStorage.getItem("unidir_device_id");
  if (!id) {
    // Generate a new UUID-like ID if it doesn't exist
    id = crypto.randomUUID();
    localStorage.setItem("unidir_device_id", id);
  }
  return id;
}
