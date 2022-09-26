import { format, isDate } from "date-fns";
import { useEffect, useState } from "react";
import useAppState from "../hooks/useAppState";
import { IUserModel } from "../interfaces";

const Dashboard = () => {
  const { appState, retrieveUsers, signOut } = useAppState();
  const { user } = appState;
  const [users, setUsers] = useState<IUserModel[]>([]);

  useEffect(() => {
    if (appState.isSignIn) {
      (async (): Promise<void> => {
        setUsers(await retrieveUsers());
      })();
    }
  }, []);

  return (
    <>
      <h3>Hola {user.fullname}!!</h3>
      <input type="button" value="Cerrar Sesión" onClick={signOut} />

      <br />
      <table>
        <thead>
          <tr>
            <td>Name</td>
            <td>Birth Date</td>
            <td>Photo</td>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan={3}>No data to display.</td>
            </tr>
          )}
          {users.length > 0 &&
            users.map((u: IUserModel) => {
              return (
                <tr key={u.contactId}>
                  <td>{u.name + " " + u.surnames}</td>
                  <td>
                    {isDate(new Date(u.birthDate)) &&
                      format(new Date(u.birthDate), "MMMM dd, yyyy")}
                  </td>
                  <td>{u.photo}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default Dashboard;
