import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { data } from "../../helper/data";
import { Row, Col } from "react-bootstrap";

import { useState } from "react";

import { Form } from "formik";
import "./Form.scss";
import { useGlobalContext } from "../context/Global";
import SelectControl from "../selectcomponent/select";
import BtnControl from "../btncomponent/btn";
import TextControl from "../textcomponent/text";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

const Formcomponent = ({ setFieldValue }) => {
  const {
    currentItem,
    history,
    sethistory,

    options,

    timOptions,

    start_date,
    setstart_date,

    setSubmitBtnName,
  } = useGlobalContext();

  return (
    <div>
      <Form>
        <div>
          {data

            .filter((item) => item.stream.includes(currentItem))

            .map((filteredlist, i) => (
              <div className="form-row header" key={i}>
                <label htmlFor={filteredlist.name} className="label">
                  {filteredlist.label}
                </label>

                {(filteredlist.type == "url" ||
                  filteredlist.type == "text") && (
                  <TextControl {...filteredlist} />
                )}
                {filteredlist.type == "checkbox" && (
                  <>
                    <Row>
                      <label className="lbltxt">
                        Please enter the desired duration or specific time
                        period to generate cumulative data
                      </label>
                    </Row>
                    <Row className="radiorow">
                      <Col md="7">
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                        >
                          <FormControlLabel
                            value="history"
                            control={<Radio color="success" />}
                            label="from Channel started date"
                            onChange={() => {
                              sethistory(true);
                            }}
                          />
                          <FormControlLabel
                            value="custom"
                            control={<Radio color="success" />}
                            label="Custom Date"
                            onChange={() => {
                              sethistory(false);
                            }}
                          />
                        </RadioGroup>
                      </Col>
                      <Col md="5">
                        {history ? null : (
                          <DatePicker
                            dateFormat="yyyy/MM/d"
                            selected={start_date}
                            className="form-control"
                            name="start_date"
                            onChange={(date) => {
                              setstart_date(date);
                            }}
                          />
                        )}
                      </Col>

                      {/* <Col md="5">
                                                <CheckboxControl
                                                    values={values}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                    {...filteredlist}
                                                />

                                                <label className="lab">
                                                    From Channel start date
                                                </label>
                                            </Col>
                                            <Col md="7">
                                                <CheckboxControl
                                                    values={values}
                                                    setFieldValue={
                                                        setFieldValue
                                                    }
                                                    {...filteredlist}
                                                />
                                                <label className="lab">
                                                    Custom Date
                                                </label>
                                                <DatePicker
                                                    dateFormat="yyyy/MM/d"
                                                    selected={start_date}
                                                    className="form-control"
                                                    name="start_date"
                                                    disabled={custom}
                                                    onChange={(date) => {
                                                        setstart_date(date);
                                                    }}
                                                />
                                            </Col> */}
                    </Row>
                  </>
                )}

                {filteredlist.type == "select" && (
                  <SelectControl
                    {...filteredlist}
                    setFieldValue={setFieldValue}
                    options={options}
                    timOptions={timOptions}
                  />
                )}
              </div>
            ))}
        </div>
        <BtnControl setSubmitBtnName={setSubmitBtnName} />
      </Form>
    </div>
  );
};

export default Formcomponent;
