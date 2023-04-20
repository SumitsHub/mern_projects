import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ContactsProvider from "./context/ContactsProvider";
import ConversationsProvider from "./context/ConversationsProvider";
import SocketProvider from "./context/SocketProvider";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [id, setId] = useLocalStorage("id");

  return (
    <>
      {id ? (
        <SocketProvider id={id}>
          <ContactsProvider>
            <ConversationsProvider id={id}>
              <Dashboard id={id} />
            </ConversationsProvider>
          </ContactsProvider>
        </SocketProvider>
      ) : (
        <Login onIdSubmit={setId} />
      )}
    </>
  );
}

export default App;
