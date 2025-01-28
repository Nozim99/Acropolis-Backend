import app from './app';
import { PORT } from './utils/constants';


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
