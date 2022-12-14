import { Button, ListGroup, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getAllTables } from "../../redux/tablesRedux";

const Home = () => {
  const tables = useSelector(getAllTables);
  return (
    <div>
      <h1 className="my-4">All tables</h1>
      <ListGroup variant="flush" >
        {tables.map((table) => (
          <ListGroup.Item key={table.id} {...table} className="px-0">
            <Stack direction="horizontal" gap={4} >
                <h2>Table {table.id}</h2>
                <p className="mb-1"><strong>Status: </strong>{table.status}</p>
                <Button variant="primary" className="ms-auto">Show more</Button>
            </Stack>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default Home;
