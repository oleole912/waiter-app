import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTableById, sendData } from "../../redux/tablesRedux";

const statuses = {
  busy: "Busy",
  reserved: "Reserved",
  free: "Free",
  cleaning: "Cleaning",
};

const Table = () => {
  const { id } = useParams();
  const table = useSelector((state) => getTableById(state, id));

  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(Number(table.peopleAmount));
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(
    Number(table.maxPeopleAmount)
  );
  const [bill, setBill] = useState(Number(table.bill));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (status === statuses.cleaning || status === statuses.free) {
      setPeopleAmount(0);
    }
    if (status !== statuses.busy) {
      setBill(0);
    }
  }, [status]);

  useEffect(() => {
    if (maxPeopleAmount < peopleAmount) {
      setPeopleAmount(maxPeopleAmount);
    }
  }, [peopleAmount, maxPeopleAmount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id,
      status,
      bill,
      peopleAmount,
      maxPeopleAmount,
    };
    dispatch(sendData(obj));
    console.log(obj);
    navigate("/");
  };

  if (!table) return <Navigate to="/" />;
  return (
    <div>
      <h1 className="my-4">Table {table.id}</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="my-3">
          <Form.Label column sm={2} lg={1}>
            <strong>Status:</strong>
          </Form.Label>
          <Col sm={6} lg={4}>
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              {Object.values(statuses).map((value) => (
                <option key={value}>{value}</option>
              ))}
            </Form.Select>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="my-3">
          <Form.Label column sm={2} lg={1}>
            <strong>People:</strong>
          </Form.Label>
          <Col sm={2} lg={1}>
            <Form.Control
              type="number"
              min="0"
              max={maxPeopleAmount}
              value={peopleAmount || ""}
              onChange={(e) => setPeopleAmount(Number(e.target.value))}
            />
          </Col>
          /
          <Col sm={2} lg={1}>
            <Form.Control
              type="number"
              min="0"
              max="10"
              value={maxPeopleAmount || ""}
              onChange={(e) => setMaxPeopleAmount(Number(e.target.value))}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className={status !== statuses.busy ? "d-none" : "my-3"}
        >
          <Stack direction="horizontal">
            <Form.Label column sm={2} lg={1}>
              <strong>Bill:</strong>
            </Form.Label>
            <Form.Text>
              <p className="m-1">$ </p>
            </Form.Text>
            <Col sm={2} lg={1}>
              <Form.Control
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </Col>
          </Stack>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
};

export default Table;
