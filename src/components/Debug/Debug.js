import React, {useEffect, useState} from 'react';
import {AdvancedTable} from "rt-design";
import {apiGetAssdConfigByName, apiGetDynamicDataByConfigName, apiGetDynamicDataCountByConfigName} from "../../apis/Assd.api";
import BasePage from "../App/BasePage";

import dispatcherModeCardListColumns from "./dispatcherModeCardListColumns";

const Debug = props => {

    /** Table states */
    const [mounted, setMounted] = useState(false);
    const [configData, setConfigData] = useState({});

    // const [rows, setRows] = useState([]);

    /** Ссылка на объект таблицы */
    const [tableRef, setTableRef] = useState({});
    const _setTableRef = ref => setTableRef(ref);

    useEffect(() => {
        if (!mounted) {
            // loadData({data: {}});
            apiGetAssdConfigByName('modeCardsRegistry')()
                .then(response => {
                    setConfigData(response.data);
                    setMounted(true);
                })
                .catch(error => {
                    console.log('error -> ', error);
                });
        }
        // setTimeout(() => setMounted(true), 1000);
    }, [mounted]);


    return (
        <BasePage>
            {mounted ? (
                <AdvancedTable
                    ref={_setTableRef}
                    configData={configData}
                    fixWidthColumn={true}
                    type={'infinity'}
                    customColumnProps={dispatcherModeCardListColumns}
                    requestLoadRows={apiGetDynamicDataByConfigName(
                        'modeCardsRegistry'
                    )}
                    requestLoadCount={apiGetDynamicDataCountByConfigName(
                        'modeCardsRegistryCount'
                    )}
                    footerShow={true}
                />
            ) : null}
        </BasePage>
    );
};

Debug.propTypes = {

};

export default Debug;
