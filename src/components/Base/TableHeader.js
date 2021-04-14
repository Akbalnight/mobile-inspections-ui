import {
	AddCustomObjectOnServer,
	EditCustomObjectOnServer,
} from './Modals/CustomObjectOnServer';
import {
	AddCustomGroupOnServer,
	EditCustomGroupOnServer,
} from './Modals/CustomGroupOnServer';
import {DeleteOnServer} from './Modals/DeleteOnServer';
import {CustomObjectView} from './Modals/CustomObjectView';
import {CustomGroupView} from './Modals/CustomGroupView';
import {
	AddDefaultObjectOnServer,
	EditDefaultObjectOnServer,
} from './Modals/DefaultObjectOnServer';
import {DefaultObjectView} from './Modals/DefaultObjectView';
import React from 'react';
import {classic} from 'rt-design';

const {Row} = classic;

/**
 *
 * @param catalogName name of server configuration
 * @param unique phrase on Russian
 * @returns {JSX.object}
 * @desc Function choice table header buttons(action modals) and view modals
 */

export const TableHeader = ({catalogName, unique}) => {
	const configCatalogName = (catalogName) => {
		switch (catalogName) {
			case 'equipments':
			case 'defectTypical':
				return (
					<>
						<AddCustomObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<AddCustomGroupOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<EditCustomObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<EditCustomGroupOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<DeleteOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<CustomObjectView
							catalogName={catalogName}
							unique={unique}
						/>
						<CustomGroupView catalogName={catalogName} />
					</>
				);
			default:
				return (
					<>
						<AddDefaultObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						<EditDefaultObjectOnServer
							catalogName={catalogName}
							unique={unique}
						/>
						{/*<DeleteOnServer catalogName={catalogName} unique={unique} />*/}
						<DefaultObjectView
							catalogName={catalogName}
							unique={unique}
						/>
					</>
				);
		}
	};
	return <Row className={'p-8'}>{configCatalogName(catalogName)}</Row>;
};
