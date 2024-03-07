import app from './app'
import appConfig from './config/appConfig';
import Cliente from './models/Cliente';

app.listen(appConfig.PORT, appConfig.IP, async ()=>{
    console.log(`rodando na url http://${appConfig.IP}:${appConfig.PORT}/`);
    // await Cliente.createTable()
})
