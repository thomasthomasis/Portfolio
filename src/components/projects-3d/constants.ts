// One accent colour per project ID
export const ORB_COLORS: Record<string, string> = {
  "ulti-tracker":    "#3b82f6", // blue
  "manhunt":         "#8b5cf6", // violet
  "typing-99":       "#14b8a6", // teal
  "typemaker":       "#f59e0b", // amber
  "music-generator": "#f43f5e", // rose
};

export const CLUSTER_RADIUS   = 1.3;  // fibonacci sphere radius (idle)
export const SPREAD_RADIUS    = 3.6;  // pentagon radius (exploring)

export const CAMERA_Z_IDLE      = 7;
export const CAMERA_Z_EXPLORING = 8.2;
export const CAMERA_Z_FOCUSED   = 3.8;

// Frame-rate–independent lerp base rates (t per second)
export const LERP_CAMERA = 0.06;
export const LERP_ORB    = 0.09;
