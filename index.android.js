'use strict';

import { NativeModules } from 'react-native';

let ApiAi = NativeModules.ApiAi;

ApiAi.setContexts = (contexts) => {
    ApiAi.setContextsAsJson(JSON.stringify(contexts))
};

ApiAi.setEntities = (entities) => {
    ApiAi.setEntitiesAsJson(JSON.stringify(entities))
};

module.exports = ApiAi;