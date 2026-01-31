export default function StatsTable({ stats }) {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Registered users</td>
            <td>{stats.userCount}</td>
          </tr>
          <tr>
            <td>Verified users</td>
            <td>{stats.verified}</td>
          </tr>
          <tr>
            <td>Logged in</td>
            <td>{stats.loggedIn}</td>
          </tr>
          <tr>
            <td>Successful invites</td>
            <td>{stats.inviters}</td>
          </tr>
          <tr>
            <td>Invited users</td>
            <td>{stats.invitees}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}