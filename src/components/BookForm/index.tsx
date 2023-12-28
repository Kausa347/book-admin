import {
    Button,
    DatePicker,
    Form,
    Input,
    InputNumber, message, Modal,
    Select,
    Upload, UploadFile,
    UploadProps
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import React, {useEffect, useState} from "react";
import {RcFile} from "antd/es/upload";
import {Callbacks} from "rc-field-form/lib/interface";

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 12},
};

const tailLayout = {
    wrapperCol: {offset: 8, span: 16},
};

type selectionType = { label: string, value: string | number }
const getBase64 = (file: RcFile  ): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const uploadButton = (
    <div>
        <PlusOutlined/>
        <div style={{marginTop: 8}}>Upload</div>
    </div>
);


export const BookForm = ({selectOption, onFinish}: {
    selectOption: Array<selectionType>,
    onFinish: Callbacks['onFinish']
}) => {
    const [form] = Form.useForm();
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        console.log('file', file);
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
        setFileList(newFileList);

    const onReset = () => {
        form.resetFields();
    };

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'male':
                form.setFieldsValue({note: 'Hi, man!'});
                break;
            case 'female':
                form.setFieldsValue({note: 'Hi, lady!'});
                break;
            case 'other':
                form.setFieldsValue({note: 'Hi there!'});
                break;
            default:
        }
    };

    const props: UploadProps = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        fileList: fileList,
        listType: 'picture-card',
        onChange(info) {
            handleChange(info)
        },
        onPreview(file: UploadFile) {
            handlePreview(file)
        }
    }

    function getImgValue(e: { file: UploadFile }) {
        getBase64(e.file.originFileObj as RcFile).then((url) => {
            e.file.thumbUrl = url;
        })
        return e.file;
    }

    function beforeUpload(file: RcFile) {
        const maxSize =  1024 * 1024; // 2MB
        if (file.size > maxSize) {
            message.error('上传图片大小不能超过1MB！');
            return false; // 阻止上传
        }
        return true
    }

    function customRequest(value:any) {
        const { onSuccess, onError, file } = value;
        const Time = setInterval(() => {
            if (fileList.length!== 0) {
                onSuccess(null,file);
                message.success('上传成功');
                clearInterval(Time);
            }
        },500)}

    return (
        <Form
            form={form}
            name="control-hooks"
            onFinish={onFinish}
            {...layout}
        >
            <Form.Item name="name" label="名称"
                       rules={[{required: true, message: '请输入名称'}]}>
                <Input placeholder={'请输入'}/>
            </Form.Item>
            <Form.Item name="auhor" label="作者" rules={[{required: true, message: '请输入作者'}]}>
                <Input placeholder={'请输入'}/>
            </Form.Item>
            <Form.Item name={'tag'} label={'类别'}>
                <Select
                    onChange={onGenderChange}
                    allowClear
                    options={selectOption}
                >
                </Select>
            </Form.Item>

            <Form.Item label={'封面'} name={'cover'} getValueFromEvent={(e) => getImgValue(e)}>

                <Upload {...props} beforeUpload={beforeUpload} customRequest={customRequest}>
                    {fileList.length === 1 ? null : uploadButton}
                </Upload>
            </Form.Item>
            <Modal open={previewOpen} title={previewTitle}
                   footer={null} onCancel={handleCancel}>
                <img src={previewImage} alt="/" style={{width: '100%'}}/>
            </Modal>
            <Form.Item label={'出版日期'} name={'createdAt'}>
                <DatePicker placeholder={'选择时间'}/>
            </Form.Item>

            <Form.Item label={'库存'} name={'stock'}>
                <InputNumber/>
            </Form.Item>

            <Form.Item label={'描述'} name={'description'}>
                <TextArea/>
            </Form.Item>

            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit" style={{marginRight: '20px'}}>
                    创建
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    )
}




