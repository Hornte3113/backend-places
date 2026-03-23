
import app from "./app";
import { env } from "./config/env";

app.listen(env.port, () => {
  console.log("\x1b[36m");
  console.log("╔══════════════════════════════════════╗");
  console.log("║   act6-c2-backend  ✓  corriendo      ║");
  console.log(`║   http://localhost:${env.port}              ║`);
  console.log(`║   Entorno: ${env.nodeEnv.padEnd(26)}║`);
  console.log("╚══════════════════════════════════════╝");
  console.log("\x1b[0m");
});
