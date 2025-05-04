import "dotenv/config";

import app from "./app.js";
import { dbConnection } from "./src/config/database.config.js";

const PORT = process.env.PORT;

dbConnection();

app.listen(PORT || 8080, () => {
    console.log(`✅ Server is running on http://localhost:${PORT}`);
});
