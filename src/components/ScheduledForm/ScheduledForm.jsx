import { DatePicker, Form, Select } from "antd";
import { extractValueFromStorage } from "../../utils/functions";
import {formStyle} from "../../style/ form.style.js";

function ScheduledForm({ onChangeJobDate, onChangeJobStart, onChangeJobEnd, onChangeTechnician }) {
    return (
        <Form
            name="scheduled"
            wrapperCol={{ span: 24 }}
            style={formStyle}
            initialValues={{
                technician: extractValueFromStorage("technician"),
            }}
            autoComplete="off"
        >
            <h2>Scheduled</h2>
            <Form.Item name="date">
                <DatePicker
                    placeholder="Start date"
                    style={{ width: "100%" }}
                    format="YYYY-MM-DD"
                    onChange={onChangeJobDate}
                    value={extractValueFromStorage("date")}
                />
            </Form.Item>

            <div className="form-vert-group">
                <Form.Item name="jobStart">
                    <DatePicker
                        placeholder="Start time"
                        style={{ width: 137 }}
                        showTime
                        picker="time"
                        format="HH:mm"
                        onChange={onChangeJobStart}
                    />
                </Form.Item>

                <Form.Item name="jobEnd">
                    <DatePicker
                        placeholder="End time"
                        style={{ width: 137 }}
                        showTime
                        picker="time"
                        format="HH:mm"
                        onChange={onChangeJobEnd}
                    />
                </Form.Item>
            </div>

            <Form.Item name="technician">
                <Select
                    options={[
                        { value: "", label: "Test select", disabled: true },
                        { value: "Timur", label: "Timur" },
                        { value: "2", label: "2" },
                    ]}
                    onChange={onChangeTechnician}
                />
            </Form.Item>
        </Form>
    );
}

export default ScheduledForm;
