import { getUsers } from "@/lib/db";

export default async function Home() {
  const users = await getUsers();
  console.log(users);

  return (
    <div>
      <ul>
        {users.map(user => (
          <li key={user.name}>{user.name}</li>
        )) }
      </ul>
    </div>
  );
}
