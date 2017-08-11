'use strict';

import { NativeModules } from 'react-native';

let ApiAi = NativeModules.ApiAi;

ApiAi.setContexts = (contexts) => {
    ApiAi.setContextsAsJson(JSON.stringify(contexts))
}

module.exports = ApiAi;