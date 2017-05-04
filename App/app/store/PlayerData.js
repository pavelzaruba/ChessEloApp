/*
 * File: app/store/PlayerData.js
 *
 * This file was generated by Sencha Architect
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 6.5.x Modern library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 6.5.x Modern. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Enif.store.PlayerData', {
    extend: 'Ext.data.Store',

    requires: [
        'Enif.model.PlayerData',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json',
        'Ext.data.writer.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'PlayerData',
            autoLoad: true,
            model: 'Enif.model.PlayerData',
            proxy: {
                type: 'ajax',
                url: 'http://192.168.88.176:8181/players',
                actionMethods: {
                    create: 'PUT',
                    read: 'GET',
                    update: 'POST',
                    destroy: 'DELETE'
                },
                reader: {
                    type: 'json'
                },
                writer: {
                    type: 'json'
                }
            },
            listeners: {
                datachanged: {
                    fn: me.onJsonstoreDataChange
                }
            }
        }, cfg)]);
    },

    onJsonstoreDataChange: function(store, eOpts) {

        // Player data changed, recalculate values for Wins Store


        let playerData = store.getData(),
            winsStore = Ext.getStore('WinsByColor'),
            winsWhite = 0,
            winsBlack = 0;

        if (!playerData) return;

        for(let i =0; i < playerData.getCount(); i++){
            winsWhite += playerData.getAt(i).get('winsWhite');
            winsBlack += playerData.getAt(i).get('winsBlack');
        }

        winsStore.setData([{
            color: 'White',
            wins: winsWhite
        },{
            color: 'Black',
            wins: winsBlack
        }]);

    }

});