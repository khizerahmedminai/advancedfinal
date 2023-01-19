import React from 'react';
import { Button, Row, Col } from 'reactstrap';
export default function PageButtons(props) {
  return (
    <Col
      xxl={props?.xxl}
      xl={props?.xl}
      lg={props?.lg}
      md={props?.md}
      sm={props?.sm}
      xs={props?.xs}
    >
      <Row className='px-4'>
        {props.tabs.map((item, i) => {
          return (
            <>
              <Button
                key={item}
                color='primary'
                className={'btn btn-primary rounded-pill mr-3 mb-3'}
                style={
                  props.activeButton === (i + 1).toString() ? { backgroundColor: '#144479' } : null
                }
                onClick={() => {
                  props.toggleButton((i + 1).toString());
                }}
              >
                {item}
              </Button>
            </>
          );
        })}
      </Row>
    </Col>
  );
}
