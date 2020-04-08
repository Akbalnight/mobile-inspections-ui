import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {
    apiGetCatalogById,
    apiGetDataByConfigName,
    apiGetEquipmentById,
    apiSaveEquipment
} from "../../../../apis/catalog.api";
import {Form, Input, InputNumber, Modal, notification} from "antd";
import {Select} from "rt-design";

const EquipmentsModal = props => {
    const {
        title,
        visible,
        typeOperation,
        setVisibleSaveForm,
        initFormObject,
    } = props;

    const [initModelObject, setInitModelObject] = useState({});
    const [initMarkObject, setInitMarkObject] = useState({});
    const [initParentObject, setInitParentObject] = useState({});
    const [form] = Form.useForm();

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    useEffect(() => {
        loadForm();
    }, [visible]);

    async function loadForm() {
        try {
            // console.log('loadForm', visible, typeOperation );
            if (visible) {
                if(typeOperation === 'create'){
                    setInitModelObject(null);
                    setInitMarkObject(null);
                    setInitParentObject(null);
                    form.resetFields();
                }
                else if (initFormObject) {
                    // Получить объект модели
                    if(initFormObject.modelId) {
                        const model = await apiGetCatalogById({
                            catalogName: 'equipmentModels',
                            id: initFormObject.modelId
                        });
                        setInitModelObject(model.data);
                    } else setInitModelObject(null);

                    // Получить объект марки
                    if(initFormObject.markId) {
                        const mark = await apiGetCatalogById({
                            catalogName: 'equipmentMarks',
                            id: initFormObject.markId
                        });
                        setInitMarkObject(mark.data);
                    } else setInitMarkObject(null);

                    // Получить объект родителя
                    if(initFormObject.parentId) {
                        const parentEquipment = await apiGetEquipmentById({id: initFormObject.parentId});
                        setInitParentObject(parentEquipment.data);
                    } else setInitParentObject(null);

                    // console.log(model);
                    // console.log(mark);
                    // console.log(parentEquipment);

                    // setInitModelObject(model.data);

                    form.resetFields();
                }
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
            }
            console.log(error.config);
        }
    }

    const onSave = () => {
        form.validateFields()
            .then(values => {
                // onSave(values);
                const saveObject = {...initFormObject, ...values};
                saveObject.isGroup = false;
                // console.log('onSave:', saveObject);
                const method = typeOperation === 'create' ? 'POST' : 'PUT';

                apiSaveEquipment({method, data: saveObject})
                    .then(response => {
                        // setConfigData(response.data);
                        // if (!mounted) setMounted(true);
                        // console.log('response -> ', response);
                        notification.success({message: 'Сохранение прошло успешно'});
                        setVisibleSaveForm(false);
                        form.resetFields();
                    })
                    .catch(error => {
                        console.log('error -> ', error);
                        notification.error({
                            message: 'Произошла ошибка при хохранении'
                        });
                    });
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16}
    };

    const handleCancel = () => {
        setVisibleSaveForm(false);
    };

    const selectHandler = (name, keys) => {
        if (keys && keys.length > 0) return keys[0];
        else return null;
    };

    return (
        <Modal
            title={title}
            centered
            visible={visible}
            okText='Сохранить'
            cancelText='Отмена'
            onCancel={handleCancel}
            onOk={onSave}
        >
            <Form
                {...layout}
                name='PhysicalHierarchyAdd'
                form={form}
                size={'small'}
                initialValues={{
                    code: initFormObject && initFormObject.code,
                    name: initFormObject && initFormObject.name,
                    modelId: initFormObject && initFormObject.modelId,
                    markId: initFormObject && initFormObject.markId,
                    parentId:
                        initFormObject && initFormObject.parentId
                            ? initFormObject.parentId
                            : null
                }}
            >
                {typeOperation === 'update' ? (
                    <Form.Item
                        label='Код'
                        name='code'
                        rules={[
                            {required: true, message: 'Пожалуйста введите код'}
                        ]}
                    >
                        <InputNumber style={{width: '100%'}} min={1} max={99999999} size={'small'} placeholder='Введите значение' />
                    </Form.Item>
                ) : null}

                <Form.Item
                    label='Наименование'
                    name='name'
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите наименование'
                        }
                    ]}
                >
                    <Input size={'small'} placeholder='Введите значение' />
                </Form.Item>

                <Form.Item
                    label='Модели'
                    name='modelId'
                    getValueFromEvent={selectHandler}
                    trigger={'onChangeKeys'}
                    rules={[{required: true, message: 'Пожалуйста выберите модель'}]}
                >
                    <Select
                        name={'modelId'}
                        section={'SelectEquipmentsModel'}
                        type={'SingleSelect'}
                        rowRender={'name'}
                        widthControl={0}
                        heightPopup={300}
                        defaultSelectedRowKeys={
                            initModelObject ? [initModelObject.id] : []
                        }
                        defaultSelectedRowObjects={
                            initModelObject ? [initModelObject] : []
                        }
                        // onChangeKeys={selectParentHandler}
                        requestLoadRows={({data, params}) =>
                            apiGetDataByConfigName({
                                configName: 'equipmentModels',
                                hierarchical: false,
                                lazyLoad: false,
                                data,
                                params
                            })
                        }
                    />
                </Form.Item>

                <Form.Item
                    label='Марка'
                    name='markId'
                    getValueFromEvent={selectHandler}
                    trigger={'onChangeKeys'}
                    rules={[{required: true, message: 'Пожалуйста выберите марку'}]}
                >
                    <Select
                        name={'markId'}
                        section={'SelectEquipmentsMark'}
                        type={'SingleSelect'}
                        rowRender={'name'}
                        widthControl={0}
                        heightPopup={300}
                        defaultSelectedRowKeys={
                            initMarkObject ? [initMarkObject.id] : []
                        }
                        defaultSelectedRowObjects={
                            initMarkObject ? [initMarkObject] : []
                        }
                        // onChangeKeys={selectParentHandler}
                        requestLoadRows={({data, params}) =>
                            apiGetDataByConfigName({
                                configName: 'equipmentMarks',
                                hierarchical: false,
                                lazyLoad: false,
                                data,
                                params
                            })
                        }
                    />
                </Form.Item>

                <Form.Item
                    label='Группа'
                    name='parentId'
                    getValueFromEvent={selectHandler}
                    trigger={'onChangeKeys'}
                    rules={[{required: false}]}
                >
                    <Select
                        name={'parentId'}
                        section={'SelectPhysicalHierarchyParent'}
                        type={'SingleSelect'}
                        expandColumnKey={'id'}
                        rowRender={'name'}
                        nodeAssociated={false}
                        expandDefaultAll={true}
                        widthControl={0}
                        heightPopup={300}
                        defaultSelectedRowKeys={
                            initParentObject ? [initParentObject.id] : []
                        }
                        defaultSelectedRowObjects={
                            initParentObject ? [initParentObject] : []
                        }
                        // onChangeKeys={selectParentHandler}
                        requestLoadRows={({data, params}) =>
                            apiGetDataByConfigName({
                                configName: 'equipmentsGroups',
                                hierarchical: true,
                                lazyLoad: false,
                                data,
                                params
                            })
                        }
                    />
                </Form.Item>
                {/*</div>*/}
            </Form>
        </Modal>
    );
};

EquipmentsModal.propTypes = {

};

export default EquipmentsModal;
