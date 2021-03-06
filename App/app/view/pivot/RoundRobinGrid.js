/*
 * File: app/view/pivot/RoundRobinGrid.js
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

Ext.define('Enif.view.pivot.RoundRobinGrid', {
    extend: 'Ext.pivot.Grid',
    alias: 'widget.pivot.roundrobingrid',

    requires: [
        'Enif.view.pivot.RoundRobinGridViewModel',
        'Ext.pivot.matrix.Local',
        'Ext.pivot.dimension.Item'
    ],

    viewModel: {
        type: 'pivot.roundrobingrid'
    },
    height: '100%',
    width: '100%',
    sortable: false,
    enableColumnSort: false,

    matrix: {
        store: 'PlayerData',
        leftAxis: [
            {
                dataIndex: 'name',
                sortable: false,
                sortIndex: 'uid'
            }
        ],
        topAxis: [
            {
                dataIndex: 'name',
                sortable: false,
                sortIndex: 'uid'
            }
        ],
        aggregate: {
            renderer: function(value, record, dataIndex, cell, column) {
                let cellColumn = parseInt(dataIndex.replace(/\D/g,''));
                let playersStore = Ext.getStore('PlayerData');

                if (cellColumn > playersStore.count() || record.data.isRowGrandTotal) { //aggregate cells
                    cell.setBodyStyle({
                        background: '#025b80'
                    });
                    return;
                }

                let extID = Object.keys(record.data).find(el => {
                    //console.log(el);
                    return el.startsWith("ext");
                });

                let cellRow = playersStore.find('name', record.data[extID])+1;

                if (cellColumn === cellRow) {
                    cell.setBodyStyle({
                        background: '#025b80'
                    });
                    return;
                }

                let wins = 0,
                draws = 0,
                loses = 0;

                let games = Ext.getStore('GameRawData');

                games.clearFilter();

                games.getData().items.forEach(rec => {
                    if ((rec.get('playerWhite') === cellRow &&
                    rec.get('playerBlack') === cellColumn &&
                    rec.get('result') === 'white') ||
                    (rec.get('playerBlack') === cellRow &&
                    rec.get('playerWhite') === cellColumn &&
                    rec.get('result') === 'black')) {
                        wins++;
                    } else if((rec.get('playerWhite') === cellRow &&
                    rec.get('playerBlack') === cellColumn &&
                    rec.get('result') === 'black') ||
                    (rec.get('playerBlack') === cellRow &&
                    rec.get('playerWhite') === cellColumn &&
                    rec.get('result') === 'white')) {
                        loses++;
                    } else if((rec.get('playerWhite') === cellRow &&
                    rec.get('playerBlack') === cellColumn &&
                    rec.get('result') === 'draw') ||
                    (rec.get('playerBlack') === cellRow &&
                    rec.get('playerWhite') === cellColumn &&
                    rec.get('result') === 'draw')) {
                        draws++;
                    }
                });

                return wins + " : " + draws + " : " + loses + ' (' + (wins+draws+loses) + ')';

            },
            dataIndex: 'games',
            sortable: false
        }
    }

});