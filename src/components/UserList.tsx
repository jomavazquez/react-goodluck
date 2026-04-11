interface UserListProps {
  users: string[];
}

export const UserList = ({ users }: UserListProps) => (
  <div className="col-md-4 text-center">
    <h4>Super team:</h4>
    <ul id="userList">
      {
        users.map((user) => (
            <li className="list-item" key={ user }>
                { user }
            </li>
        ))
      }
      {
        users.length === 0 &&
        <li>Damn cowards!!!</li>
    }
    </ul>
  </div>
);