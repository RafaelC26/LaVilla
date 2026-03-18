export const demoUsers = [
  {
    id: "demo-client-1",
    role: "client",
    displayName: "Camila Rojas",
    email: "cliente.demo@horizon.test",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: "demo-host-1",
    role: "host",
    displayName: "Andres Velasquez",
    email: "host.demo@horizon.test",
    password: "demo123",
    avatar: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=100&h=100&fit=crop&crop=face"
  }
];

export const getDashboardPathForRole = (role) => {
  if (role === "host") {
    return "/dashboard/host";
  }

  return "/dashboard/client";
};
