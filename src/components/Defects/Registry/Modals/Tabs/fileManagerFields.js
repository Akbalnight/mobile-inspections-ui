import {classic, notificationError} from 'rt-design';
import React from 'react';
import {AttachmentsPreview} from '../../../../Base/Functions/MediaUtils';
import {
	apiGetFlatDataByConfigName,
	apiSaveFileByConfigName,
} from '../../../../../apis/catalog.api';

const {Layout, Space, Custom, UploadFile} = classic;

export const FilesTabFields = ({sRow}) => {
	return (
		<Layout className={'px-8'}>
			<Space className={'mb-8'}>
				<UploadFile
					itemProps={{
						name: 'defectUploadFilesHolder', // <- по этому ключу лежит объект с данными для загрузки
						valuePropName: 'dataObject',
					}}
					requestUploadFile={apiSaveFileByConfigName(
						`defectFilesSave`
					)}
					dispatch={{
						path: 'defects.defectTable.modal.defectFileUpload',
						type: 'event',
					}}
				/>
			</Space>
			<Custom
				itemProps={{name: 'defectPreviewFiles'}} // пропс будет заполнен по подписке на кнопку загрузки
				render={(props) => (
					<AttachmentsPreview items={props.defectPreviewFiles} />
				)}
				subscribe={[
					{
						// withMount: true, // можно использовать, если не сработает событие монтирования кнопки
						name: 'defectFileUploadCustom',
						path: `rtd.defects.defectTable.modal.defectFileUpload`,
						onChange: ({setSubscribeProps}) => {
							apiGetFlatDataByConfigName('defectFiles')({
								data: {
									defectId: sRow.id,
								},
							})
								.then((response) => {
									setSubscribeProps({
										defectPreviewFiles: response.data,
									});
								})
								.catch((error) =>
									notificationError(
										error,
										'Ошибка загрузки файлов гарантии'
									)
								);
						},
					},
				]}
			/>
		</Layout>
	);
};
