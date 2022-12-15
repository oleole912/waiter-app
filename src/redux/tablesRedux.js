
// actions
const createActionName = (actionName) => `app/tables/${actionName}`;
export const SHOW_TABLES = createActionName("SHOW_TABLES");
export const UPDATE_TABLE = createActionName("UPDATE_TABLE");

// selectors
export const getAllTables = (state) => state.tables;
export const getTableById = ({ tables }, tableId) =>
  tables.find((table) => table.id === tableId);

// action creators
export const showTables = (payload) => ({ type: SHOW_TABLES, payload });
export const updateTable = (payload) => ({ type: UPDATE_TABLE, payload });

export const fetchTables = () => {
  return (dispatch) => {
    fetch("http://localhost:3131/tables")
      .then((res) => res.json())
      .then((tables) => dispatch(showTables(tables)));
  };
};

export const sendData = (data) => {
  return (dispatch) => {
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    fetch(`http://localhost:3131/tables/${data.id}`, options)
      .then((res) => res.json())
      //.then(data => console.log(data))
      .then((data) => dispatch(updateTable(data)))
  };
};

const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case SHOW_TABLES:
      return [...action.payload];
    case UPDATE_TABLE:
      return statePart.map((table) =>
        table.id === action.payload.id ? {...table, ...action.payload } : table
      );
    default:
      return statePart;
  }
};

export default tablesReducer;
