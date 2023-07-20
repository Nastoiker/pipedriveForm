import { Form, Input, Select } from "antd";
import { extractValueFromStorage } from "../../utils/functions";
import {formStyle} from "../../style/ form.style.js";

function JobForm({ handleInputState, onChangeJobType, onChangeJobSource }) {
    return (
        <Form
            name="job"
            wrapperCol={{ span: 24 }}
            style={formStyle}
            initialValues={{
                jobType: extractValueFromStorage("jobType"),
                jobSource: extractValueFromStorage("jobSource"),
                jobDescription: extractValueFromStorage("jobDescription"),
            }}
            autoComplete="off"
        >
            <h2>Job details</h2>

            <Form.Item name="jobType">
                <Select
                    options={[
                        { value: "", label: "Select job type", disabled: true },
                        { value: "Type 1", label: "Type 1" },
                        { value: "Type 2", label: "Type 2" },
                    ]}
                    onChange={onChangeJobType}
                />
            </Form.Item>

            <Form.Item name="jobSource">
                <Select
                    options={[
                        { value: "", label: "Select job source", disabled: true },
                        { value: "Source 1", label: "Source 1" },
                        { value: "Source 2", label: "Source 2" },
                    ]}
                    onChange={onChangeJobSource}
                />
            </Form.Item>

            <Form.Item name="jobDescription">
                <Input.TextArea placeholder="Job description (optional)" onChange={handleInputState} />
            </Form.Item>
        </Form>
    );
}

export default JobForm;
