import React from 'react';
import { Button, Checkbox, Form, Input } from 'antd'
import UserLayout from '../../components/user/userLayout';
import {globaluse} from '../../context/global'
const Password = () => {
    const {handleUpdatePassword} = globaluse();

    const onFinish = (values) => {
        console.log('Success:', values);
        handleUpdatePassword(values.password);
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };



    return (
        <div>

<UserLayout>

<div >

<div>
    <h1>Update your Password</h1>
</div>

<div>
    
<Form
      name="Form"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
    

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

  

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Update Password
        </Button>
      </Form.Item>
    </Form> 



</div>



</div>


</UserLayout>

        </div>
    );
}

export default Password;
