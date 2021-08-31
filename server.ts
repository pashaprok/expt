require('dotenv').config({ path: `${__dirname}/config.env` });

import app from './app'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}...`);
});