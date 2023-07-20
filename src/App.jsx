
import { useEffect, useState } from "react";
import "./App.css";
import {addDeal, getDealFields, setDealField} from "./actions/queries.actions";
import { dealSchema } from "./data/deal";
import { createBody, getDealFieldsKeys, getRequiredDealFields, makeSequentialRequests } from "./utils/functions";
import { Button } from "antd";

import { ReloadOutlined } from "@ant-design/icons";

import ClientForm from "./components/ClientForm/ClientForm.jsx";
import TitleForm from "./components/TitleForm/TitleForm.jsx";
import JobForm from "./components/FormJon/FormJob.jsx";
import ServiceForm from "./components/ServiceForm/ServiceForm.jsx";
import ScheduledForm from "./components/ScheduledForm/ScheduledForm.jsx";
import MainButtonWithTooltip from "./components/MainButtonWithTooltip.jsx";
const initialState = {
    title: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    area: "",
    zipCode: "",
    jobType: "",
    jobSource: "",
    jobDescription: "",
    jobDate: "",
    jobStart: "",
    jobEnd: "",
    technician: "",
}
function App() {
    const [dealAdded, setDealAdded] = useState(false);
    const [initLoading, setInitLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dealFieldsKeys, setDealFieldsKeys] = useState([]);
    const [formsState, setFormsState] = useState(initialState);

    const handleInputState = (event) => {
        const stateKey = event.target.id.split("_")[1];
        const newFormsState = { ...formsState };
        newFormsState[stateKey] = event.target.value;
        setFormsState(newFormsState);
    };

    const prepareDealFields = async () => {
        const getDealFieldsRes = await getDealFields();
        let currentDealFields = getDealFieldsRes.data.data;

        const requiredDealFields = getRequiredDealFields(currentDealFields, dealSchema);

        if (requiredDealFields.length) {
            setInitLoading(true);
            await makeSequentialRequests(setDealField(), requiredDealFields);
        }

        setInitLoading(false);
        const getDealFieldsSecondRes = await getDealFields();
        currentDealFields = getDealFieldsSecondRes.data.data;
        setDealFieldsKeys(getDealFieldsKeys(currentDealFields, dealSchema));
    };

    const handleAddDeal = (body) => {
        setLoading(true);
        addDeal(body).then((res) => {
            setLoading(false);
            setDealAdded(true);
        });
    };

    const saveDraft = () => {
        localStorage.setItem("formsState", JSON.stringify(formsState));
    };

    useEffect(() => {
        if (localStorage.getItem("formsState")) {
            setFormsState(JSON.parse(localStorage.getItem("formsState")));
        }
        prepareDealFields();
    }, []);

    return (
        <div className="App">
            <div className="forms-wrap">
                <TitleForm handleInputState={(event) => handleInputState(event)} />
                <ClientForm handleInputState={(event) => handleInputState(event)} />
                <JobForm
                    handleInputState={(event) => handleInputState(event)}
                    onChangeJobType={(value) => setFormsState({ ...formsState, jobType: value })}
                    onChangeJobSource={(value) => setFormsState({ ...formsState, jobSource: value })}
                />
                <ServiceForm
                    handleInputState={(event) => handleInputState(event)}
                    onChangeArea={(value) => setFormsState({ ...formsState, area: value })}
                />
                <ScheduledForm
                    onChangeJobDate={(event, date) => setFormsState({ ...formsState, jobDate: date })}
                    onChangeJobStart={(event, time) => setFormsState({ ...formsState, jobStart: time })}
                    onChangeJobEnd={(event, time) => setFormsState({ ...formsState, jobEnd: time })}
                    onChangeTechnician={(value) => setFormsState({ ...formsState, technician: value })}
                />
            </div>

            <div className="button-group">
                {!formsState.title ? (
                    <MainButtonWithTooltip
                        onClick={() => handleAddDeal(createBody(dealFieldsKeys, formsState))}
                        disabled={initLoading || !formsState.title || dealAdded}
                        loading={loading || initLoading}
                        dealAdded={dealAdded}
                    />
                ) : (
                    <Button type="primary" onClick={() => handleAddDeal(createBody(dealFieldsKeys, formsState))} disabled={initLoading || !formsState.title || dealAdded} loading={loading || initLoading}>
                        {dealAdded ? "Job created" : "Create a job"}
                    </Button>
                )}
                <Button onClick={saveDraft}>Save info</Button>
                {dealAdded && <Button type="primary" icon={<ReloadOutlined />} onClick={() => setDealAdded(false)} />}
            </div>
        </div>
  );
}

export default App
