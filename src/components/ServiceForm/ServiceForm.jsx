import { Form, Input, Select } from "antd";
import { extractValueFromStorage } from "../../utils/functions";
import {formStyle} from "../../style/ form.style.js";

function ServiceForm({ handleInputState, onChangeArea }) {
    return (
        <Form
            name="service"
            wrapperCol={{ span: 24 }}
            style={formStyle}
            initialValues={{
                address: extractValueFromStorage("address"),
                city: extractValueFromStorage("city"),
                state: extractValueFromStorage("state"),
                zipCode: extractValueFromStorage("zipCode"),
                area: extractValueFromStorage("area"),
            }}
            autoComplete="off"
        >
            <h2>Service location</h2>

            <Form.Item name="address">
                <Input placeholder="Address" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="city">
                <Input placeholder="City" onChange={handleInputState} />
            </Form.Item>

            <Form.Item name="state">
                <Input placeholder="State" onChange={handleInputState} />
            </Form.Item>

            <div className="form-vert-group">
                <Form.Item name="zipCode">
                    <Input placeholder="Zip code" onChange={handleInputState} />
                </Form.Item>

                <Form.Item name="area">
                    <Select
                        options={[
                            { value: "", label: "Area", disabled: true },
                            { value: "Area 1", label: "Area 1" },
                            { value: "Area 2", label: "Area 2" },
                        ]}
                        style={{ width: 140 }}
                        onChange={onChangeArea}
                    />
                </Form.Item>
            </div>
        </Form>
    );
}

export default ServiceForm;
