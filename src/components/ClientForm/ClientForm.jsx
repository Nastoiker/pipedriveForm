import { Form, Input } from "antd";
import { extractValueFromStorage } from "../../utils/functions";
import {formStyle} from "../../style/ form.style.js";

function ClientForm({ handleInputState }) {
    return (
        <Form
            name="client-details"
            wrapperCol={{ span: 24 }}
            style={formStyle}
            initialValues={{
                firstName: extractValueFromStorage("firstName"),
                lastName: extractValueFromStorage("lastName"),
                phone: extractValueFromStorage("phone"),
                email: extractValueFromStorage("email"),
            }}
            autoComplete="off"
        >
            <h2>Client details</h2>

            <div className="form-vert-group">
                <Form.Item name="firstName">
                    <Input placeholder="First name" onChange={handleInputState} />
                </Form.Item>

                <Form.Item name="lastName">
                    <Input placeholder="Last name" onChange={handleInputState} />
                </Form.Item>
            </div>

            <Form.Item name="phone" rules={[
                {
                    message: 'The input is not valid Phone',
                    pattern: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
                },
            ]}>
                <Input placeholder="Phone" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="email"  rules={[
                {
                    type: 'email',
                    message: 'The input is not valid E-mail',
                },
            ]}>
                <Input placeholder="Email (optional)" onChange={handleInputState} />
            </Form.Item>
        </Form>
    );
}

export default ClientForm;
