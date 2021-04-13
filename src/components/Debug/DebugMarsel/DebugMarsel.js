import {BasePage} from 'mobile-inspections-base-ui';
import {classic} from 'rt-design';
import {Input} from 'antd';

const {Form, Button, Custom, FormBody, Text} = classic;
export const DebugMarsel = () => {
	// const handleChange = (e) => {
	//     console.log(e.target.value)
	// }
	return (
		<BasePage>
			<Form>
				<FormBody>
					<Custom
						itemProps={{name: 'popugai'}}
						render={({onChange, defaulValue, value}) => {
							return (
								<Input
									onChange={onChange}
									value={defaulValue}
								/>
							);
						}}
						dispatch={{
							path: 'debugMarsel.input',
						}}
					/>
					<Text
						itemProps={{name: 'newText'}}
						subscribe={[
							{
								name: 'first',
								path: 'rtd.debugMarsel.input',
								onChange: ({value, setSubscribeProps}) => {
									console.log(value);
									value &&
										setSubscribeProps &&
										setSubscribeProps({value: value});
								},
							},
						]}
					/>

					<Button htmlType={'submit'}>Save</Button>
				</FormBody>
			</Form>
		</BasePage>
	);
};
