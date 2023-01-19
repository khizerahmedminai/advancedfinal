import React, { useEffect } from 'react';
import { Button, Label, Col, Input } from 'reactstrap';
import DropDowns from '../../Contexts/InsertionContexts/DropDowns';
export default function FieldTemp(props) {
  function defaultValues(name){
    if(props.values[name]){
      return props.values[name]
    }
    else{
      return ''
    }
  }
  return (<>
    <Col md={props?.size ? props?.size : props.inputSize(props.findType(props.colname))}>
      <div className='mb-3'>
        <Label htmlFor='firstNameinput' className='form-label'>
          {props.colname}
        </Label>
        <div style={{ display: 'flex' }}>
          { props?.isDrop ? (<>
            <select defaultValue={defaultValues(props.colname)} onBlur={(e) => { e.preventDefault(); props.setData(props.colname, e.target.value);}} className="form-select">
                <option value={0} selected>Choose...</option>
                {DropDowns(props.colname).map((x, i) => {
                  return <option key={i+1} value={i+1}>{x}</option>
                })}
            </select>
                  </>) : props?.isDisabled? (<>
                    <Input
              type={props.findType(props.colname)}
              defaultValue={defaultValues(props.colname)}
              className='form-control'
              name={props.colname}
              id={props.colname}
              disabled
            ></Input>
                  </>) : (
            <Input
              type={props.findType(props.colname)}
              defaultValue={defaultValues(props.colname)}
              className='form-control'
              name={props.colname}
              id={props.colname}
              onBlur={(e) => props.setData(props.colname, e.target.value)}
            ></Input>
          )}
        </div>
      </div>
    </Col>
    </>
  );
}
