import React from 'react';
import SqlLite from 'react-native-sqlite-storage';


export default {
    loginResponse: {},
    version      : 0.1,
    tema         : 'Mavi - Beyaz',
    fontSize     : 15,
    fontName     : 'Orta',
    dict         : [],
    serverId     : 999999,
    db           : SqlLite.openDatabase({name: 'test.db', createFromLocation: '~fikra.db'}),

};
