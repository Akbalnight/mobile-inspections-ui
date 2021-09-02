import React from 'react';
import {
	Space,
	DatePicker,
	Input,
	InputNumber,
	Select,
	Text,
	Checkbox,
} from 'rt-design';

export const ConstructorFields = () => {
	return (
		<>
			<Space style={{color: 'blue'}}>first style</Space>
			<Space>
				<Space direction={'vertical'} className={'p-8'}>
					<Text label={'some start'} />
					<DatePicker
						itemProps={{
							name: 'dateStart',
						}}
						format={'DD.MM.YYYY HH:mm'}
					/>
				</Space>
				<Space direction={'vertical'} className={'p-8'}>
					<Text label={'some end'} />

					<DatePicker
						itemProps={{
							name: 'dateFinish',
						}}
						format={'DD.MM.YYYY HH:mm'}
					/>
				</Space>
			</Space>
			<Space className={'p-8'}>
				<Checkbox
					itemProps={{
						name: 'some bool',
					}}
				/>
				<Text label={'some bool'} />

				<Checkbox
					itemProps={{
						name: 'some bool',
					}}
				/>
				<Text label={'some bool'} />
			</Space>
			<Space className={'p-8'}>
				<Checkbox
					itemProps={{
						name: 'some bool',
					}}
				/>
				<Text label={'some bool'} />
			</Space>
			<Space className={'p-8'}>
				<Checkbox
					itemProps={{
						name: 'some bool',
					}}
				/>
				<Text label={'some bool'} />
				<Text label={'some number'} />
				<InputNumber
					itemProps={{
						name: ' some  number',
					}}
				/>
			</Space>
			<Space direction={'vertical'}>
				<Text label={'some select'} />
				<Select
					itemProps={{
						name: 'select',
					}}
				/>
			</Space>
		</>
	);
};
