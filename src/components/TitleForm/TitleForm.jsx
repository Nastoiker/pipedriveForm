import { Form, Input } from "antd";
import { extractValueFromStorage } from "../../utils/functions";

function TitleForm({ handleInputState }) {
    return (
        <>
            <Form
                name="title"
                wrapperCol={{ span: 24 }}
                style={{ width: 280 }}
                initialValues={{ title: extractValueFromStorage("title") }}
                autoComplete="off"
            >
                <h2>
                    Job title
                </h2>

                <Form.Item name="title">
                    <Input placeholder="Job title" onChange={handleInputState} />
                </Form.Item>
            </Form>
            <div></div>
        </>
    );
}

export default TitleForm;
