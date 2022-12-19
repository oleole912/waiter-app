import { Button, Col, Form, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTableRequest, getAllTableIds } from "../../redux/tablesRedux";
import { useNavigate } from "react-router-dom";

const AddTableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tableIds = useSelector(getAllTableIds);

  const [tableId, setTableId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addTableRequest(tableId));
    navigate("/");
  };

  const errorMessage = !tableId
    ? "Table ID is required"
    : tableIds.includes(tableId)
    ? "Table ID is already used"
    : null;

  return (
    <div>
      <h1 className="my-4">Add new table</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="my-3">
          <Form.Label column sm={2}>
            <strong>Table number:</strong>
          </Form.Label>
          <Col sm={2} lg={1}>
            <Form.Control
              type="text"
              value={tableId}
              onChange={(e) => {
                setTableId(e.target.value);
              }}
            />
          </Col>
        </Form.Group>
        {errorMessage && <p>{errorMessage}</p>}
        <Button variant="primary" type="submit" disabled={errorMessage}>
          Add table
        </Button>
      </Form>
    </div>
  );
};

export default AddTableForm;
