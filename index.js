const init = require('./init');
const Logger = require('@recntrek/wt-logger');
const wtLogger = Logger.init({env : process.env.RNT_ENV, source : name, app_version : version}, Logger.loggerTypes.Lambda);

exports.handler = async (event, context) => {
    try {
        wtLogger.addConstEnrichment(context);
        wtLogger.debug(`Starting Service with event:  ${JSON.stringify(event)}`);

        await init();
        //Add the lambda BL
    }catch(e){
       wtLogger.error(e);
       wtLogger.error(`Service ended with an error`);
       throw e;
    }finally {
       wtLogger.debug(`Successfully finished the lambda!!!`);
       await wtLogger.flushAsync();
    }

}
