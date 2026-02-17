import { createServer } from "http";
import { URL } from "url";
import { convertFromSubscription } from "./src/core/convert.js";

const PORT = 3001;

createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  
  if (url.pathname === "/api/convert") {
    const targetUrl = url.searchParams.get("url");
    const target = url.searchParams.get("target") || "clash";
    
    if (!targetUrl) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing url parameter" }));
      return;
    }
    
    try {
      const result = await convertFromSubscription(targetUrl, target as "clash" | "surge");
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(result);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`${error}`);
    }
    return;
  }
  
  res.writeHead(404);
  res.end("Not found");
}).listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
});
