import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, InputNumber, Modal, notification, Checkbox} from "antd";

const TechOperationsModal = props => {

    const {
        title,
        visible,
        typeOperation,
        initFormObject,
        setVisible,
        onSave,
    } = props;

    const [mounted, setMounted] = useState(false);
    const [labelInputDataDisabled, setLabelInputDataDisabled] = useState(true);
    const [form] = Form.useForm();

    useEffect(() => {
        setMounted(true);
    }, [mounted]);

    // Сброс значений формы
    useEffect(() => {
        if (visible && initFormObject && mounted) {
            setLabelInputDataDisabled(!initFormObject.needInputData);
            setTimeout(() => form.resetFields(), 100);
        }
    }, [visible, initFormObject, mounted, form]);

    const _onSave = () => {
        form.validateFields()
            .then(values => {
                // onSave(values);
                const saveObject = {...initFormObject, ...values, duration: parseInt(values.hours * 60) + parseInt(values.minutes)};
                console.log('onSave:', saveObject);
                // const method = typeOperation === 'create' ? 'POST' : 'PUT';

                onSave(saveObject);
                setVisible(false);
                // apiSaveBaseCatalog({catalogName, method, data: saveObject})
                //     .then(response => {
                //         // console.log('response -> ', response);
                //         notification.success({message: 'Сохранение прошло успешно'});
                //         form.resetFields();
                //         setVisible(false);
                //     })
                //     .catch(error => {
                //         console.log('error -> ', error);
                //         notification.error({
                //             message: 'Произошла ошибка при хохранении'
                //         });
                //     });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const layout = {
        labelCol: {span: 10},
        wrapperCol: {span: 14}
    };

    const rules = (field) => [
        { required: true, message: `Пожалуйста введите ${field}`}
    ];

    return (
        <Modal
            title={title}
            centered
            visible={visible}
            okText='Сохранить'
            cancelText='Отмена'
            onCancel={handleCancel}
            onOk={_onSave}
        >
            <Form
                {...layout}
                name='CatalogModalForm'
                form={form}
                size={'small'}
                labelAlign={'left'}
                initialValues={{
                    code: initFormObject && initFormObject.code,
                    name: initFormObject && initFormObject.name,
                    needInputData: initFormObject && initFormObject.needInputData,
                    labelInputData: initFormObject && initFormObject.labelInputData,
                    equipmentStop: initFormObject && initFormObject.equipmentStop,
                    increasedDanger: initFormObject && initFormObject.increasedDanger,
                    hours: initFormObject && parseInt(initFormObject.duration / 60),
                    minutes: initFormObject && initFormObject.duration % 60,

                }}
            >
                {typeOperation === 'update' ? (
                    <Form.Item
                        label='Код'
                        name='code'
                        rules={rules('код')}
                    >
                        <InputNumber style={{width: '100%'}} min={1} max={99999999} size={'small'} placeholder='Введите значение' />
                    </Form.Item>
                ) : null}

                <Form.Item
                    label='Наименование'
                    name='name'
                    rules={rules('наименование')}
                >
                    <Input.TextArea autoSize={true} size={'small'} placeholder='Введите значение' />
                </Form.Item>

                <Form.Item
                    label='Ввод данных'
                    name="needInputData"
                    valuePropName="checked">
                    <Checkbox onChange={(e) => setLabelInputDataDisabled(!e.target.checked) }/>
                </Form.Item>

                <Form.Item
                    label='Подпись ввода данных'
                    name='labelInputData'
                >
                    <Input disabled={labelInputDataDisabled} size={'small'} placeholder='Введите значение' />
                </Form.Item>

                <Form.Item
                    label={'Остановка оборудования'}
                    name="equipmentStop"
                    valuePropName="checked">
                    <Checkbox/>
                </Form.Item>

                <Form.Item
                    label={'Повышенная опасность'}
                    name="increasedDanger"
                    valuePropName="checked">
                    <Checkbox/>
                </Form.Item>
                <Form.Item
                    label="Продолжительность"
                    rules={rules('продолжительность')}>
                    <Input.Group compact>
                        <Form.Item
                            name={'hours'}
                            noStyle
                        >
                            <InputNumber size={'small'} min={0} max={12} placeholder='Часы' style={{ width: '30%' }} />
                        </Form.Item>
                        <span style={{ width: '20%', textAlign: 'center', lineHeight: '24px' }}>часы</span>
                        <Form.Item
                            name={'minutes'}
                            noStyle
                        >
                            <InputNumber size={'small'} min={0} max={60} placeholder='Минуты' style={{ width: '30%' }} />
                        </Form.Item>
                        <span style={{ width: '20%', textAlign: 'center', lineHeight: '24px'}}>минуты</span>
                    </Input.Group>
                </Form.Item>


            </Form>
        </Modal>
    );
};

TechOperationsModal.propTypes = {
    title: PropTypes.string,
    visible: PropTypes.bool,
    typeOperation: PropTypes.string,
    initFormObject: PropTypes.object,
    setVisible: PropTypes.func,
    onSave: PropTypes.func,
};

export default TechOperationsModal;
