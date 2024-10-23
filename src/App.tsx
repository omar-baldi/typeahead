import "./App.css";
import TypeAhead from "./components/TypeAhead";
import data from "./data";

function App() {
  return (
    <>
      <TypeAhead
        data={data.map((d) => ({ label: d, value: d }))}
        debounce={500}
        highlight={true}
      />
    </>
  );
}

export default App;
